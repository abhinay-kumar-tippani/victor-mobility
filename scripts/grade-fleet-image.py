import numpy as np
from PIL import Image, ImageEnhance, ImageFilter

def grade_image():
    # Load original image
    src_path = "public/images/india/luxury-fleet-lineup.jpg"
    img = Image.open(src_path).convert("RGB")
    w, h = img.size

    # Convert to float numpy array [0, 1]
    arr = np.array(img, dtype=np.float32) / 255.0

    # 1. Compute luminance
    lum = 0.299 * arr[:, :, 0] + 0.587 * arr[:, :, 1] + 0.114 * arr[:, :, 2]

    # 2. Brand palette target colors (normalized)
    # Brand obsidian: #070A12 -> (7/255, 10/255, 18/255)
    shadow_col = np.array([7 / 255.0, 10 / 255.0, 18 / 255.0], dtype=np.float32)

    # Brand indigo / ink: #1E2248 / #31326F -> (30/255, 34/255, 72/255)
    dark_mid_col = np.array([31 / 255.0, 34 / 255.0, 80 / 255.0], dtype=np.float32)

    # Brand blue / indigo: #2D5090 -> (45/255, 80/255, 144/255)
    mid_col = np.array([45 / 255.0, 80 / 255.0, 144 / 255.0], dtype=np.float32)

    # Crisp ice-blue highlight: #C7D2FE -> (199/255, 210/255, 254/255)
    high_col = np.array([199 / 255.0, 210 / 255.0, 254 / 255.0], dtype=np.float32)

    # 3. Suppress the dirty warm yellowish/greenish tints from gravel and incandescent streetlights
    # Lower red and green slightly in shadows/midtones, boost blue/indigo
    arr[:, :, 0] *= 0.65  # reduce warm red
    arr[:, :, 1] *= 0.75  # reduce warm green
    arr[:, :, 2] *= 1.35  # boost cool indigo/blue
    arr = np.clip(arr, 0.0, 1.0)

    # Re-evaluate luminance after color balance
    lum = 0.299 * arr[:, :, 0] + 0.587 * arr[:, :, 1] + 0.114 * arr[:, :, 2]

    # 4. Cinema Split-Tone blending into Brand Indigo/Blue
    # Tone curve: shadows get tinted with brand ink, midtones with brand indigo, highlights keep clean white/ice-blue
    out = np.zeros_like(arr)
    for c in range(3):
        # Shadow tint weight
        shadow_weight = np.clip(1.0 - lum * 2.5, 0.0, 1.0)
        # Midtone tint weight
        mid_weight = np.clip(np.sin(lum * np.pi), 0.0, 1.0) * 0.45
        # Highlight weight
        high_weight = np.clip((lum - 0.5) * 2.0, 0.0, 1.0)

        out[:, :, c] = (
            arr[:, :, c] * (1.0 - shadow_weight * 0.7 - mid_weight * 0.4)
            + shadow_col[c] * shadow_weight * 0.7
            + mid_col[c] * mid_weight * 0.4
            + high_col[c] * high_weight * 0.15
        )

    out = np.clip(out, 0.0, 1.0)

    # 5. Vignette & Bottom Gravel Fade:
    # The bottom 35% of the image has distracting pavement gravel.
    # Fade the bottom smoothly into solid #070A12 so it seamlessly connects with the hero bottom and cards!
    y_coords = np.linspace(0, 1, h)[:, np.newaxis]
    bottom_fade = np.clip((y_coords - 0.65) / 0.35, 0.0, 1.0)
    # Also top fade
    top_fade = np.clip((0.15 - y_coords) / 0.15, 0.0, 1.0)

    for c in range(3):
        out[:, :, c] = out[:, :, c] * (1.0 - bottom_fade * 0.85) + shadow_col[c] * (bottom_fade * 0.85)
        out[:, :, c] = out[:, :, c] * (1.0 - top_fade * 0.7) + shadow_col[c] * (top_fade * 0.7)

    # Convert back to uint8
    final_arr = np.uint8(np.clip(out * 255.0, 0, 255))
    result = Image.fromarray(final_arr)

    # Boost contrast and sharpness slightly for pristine metallic gloss
    enhancer = ImageEnhance.Contrast(result)
    result = enhancer.enhance(1.25)

    sharp = ImageEnhance.Sharpness(result)
    result = sharp.enhance(1.2)

    out_path = "public/images/india/luxury-fleet-brand-graded.jpg"
    result.save(out_path, quality=95)
    print(f"Successfully generated brand-graded image: {out_path} ({w}x{h})")

if __name__ == "__main__":
    grade_image()
