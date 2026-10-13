import numpy as np
from PIL import Image, ImageEnhance, ImageFilter

def grade_motorcade():
    src_path = "public/images/candidate-chile-motorcade.jpg"
    img = Image.open(src_path).convert("RGB")
    w, h = img.size
    print(f"Original dimensions: {w}x{h}")

    # Crop to cinematic wide 16:9 or 21:9 ratio focusing on the vehicles and tarmac
    # In original 4256x2832:
    # Vehicles are centered vertically/horizontally. The plane is on the left.
    # Let's crop nicely so the Lincoln sedan is prominently on the right-half or center-right,
    # leaving the left side open for the headline and trust badges!
    
    # Let's inspect the crop coordinates:
    # y: 600 to 2600 (height 2000), x: 0 to 4256
    crop_box = (0, int(h * 0.15), w, int(h * 0.90))
    cropped = img.crop(crop_box)
    cw, ch = cropped.size

    arr = np.array(cropped, dtype=np.float32) / 255.0

    # Luminance
    lum = 0.299 * arr[:, :, 0] + 0.587 * arr[:, :, 1] + 0.114 * arr[:, :, 2]

    # Target brand colors:
    # Obsidian: #070A12
    obsidian = np.array([7 / 255.0, 10 / 255.0, 18 / 255.0], dtype=np.float32)
    # Indigo: #31326F
    indigo = np.array([49 / 255.0, 50 / 255.0, 111 / 255.0], dtype=np.float32)
    # Blue: #2D5090
    blue = np.array([45 / 255.0, 80 / 255.0, 144 / 255.0], dtype=np.float32)
    # Ice highlight: #C7D2FE
    ice = np.array([199 / 255.0, 210 / 255.0, 254 / 255.0], dtype=np.float32)

    # 1. Darken the image overall to convert daytime tarmac into dramatic dusk/midnight
    # Gamma adjustment: pull midtones down
    arr = np.power(arr, 1.45)

    # 2. Rebalance color channels: suppress bright daylight yellow/warm tones, push cool blue/indigo
    arr[:, :, 0] *= 0.70  # red down
    arr[:, :, 1] *= 0.80  # green down
    arr[:, :, 2] *= 1.25  # blue up
    arr = np.clip(arr, 0.0, 1.0)

    # Recalculate luminance
    lum = 0.299 * arr[:, :, 0] + 0.587 * arr[:, :, 1] + 0.114 * arr[:, :, 2]

    # 3. Tone mapping into Victor brand colors:
    out = np.zeros_like(arr)
    for c in range(3):
        # Shadow weight (deep dark tarmac & shadows)
        shadow_w = np.clip(1.0 - lum * 2.2, 0.0, 1.0)
        # Midtone weight (car bodies, tarmac texture)
        mid_w = np.clip(np.sin(lum * np.pi), 0.0, 1.0) * 0.4
        # Highlight weight (headlights, chrome, reflections)
        high_w = np.clip((lum - 0.5) * 2.0, 0.0, 1.0)

        out[:, :, c] = (
            arr[:, :, c] * (1.0 - shadow_w * 0.65 - mid_w * 0.35)
            + obsidian[c] * (shadow_w * 0.65)
            + indigo[c] * (mid_w * 0.35)
            + ice[c] * (high_w * 0.20)
        )

    out = np.clip(out, 0.0, 1.0)

    # 4. Vertical dark gradient blend (top sky to midnight, bottom tarmac to obsidian)
    y_coords = np.linspace(0, 1, ch)[:, np.newaxis]
    top_darken = np.clip((0.25 - y_coords) / 0.25, 0.0, 1.0)
    bottom_darken = np.clip((y_coords - 0.60) / 0.40, 0.0, 1.0)

    for c in range(3):
        out[:, :, c] = out[:, :, c] * (1.0 - top_darken * 0.85) + obsidian[c] * (top_darken * 0.85)
        out[:, :, c] = out[:, :, c] * (1.0 - bottom_darken * 0.90) + obsidian[c] * (bottom_darken * 0.90)

    # Convert to PIL Image
    result_arr = np.uint8(np.clip(out * 255.0, 0, 255))
    result = Image.fromarray(result_arr)

    # Contrast and clarity
    enhancer = ImageEnhance.Contrast(result)
    result = enhancer.enhance(1.3)
    sharp = ImageEnhance.Sharpness(result)
    result = sharp.enhance(1.25)

    out_path = "public/images/india/hero-executive-convoy-graded.jpg"
    result.save(out_path, quality=95)
    print(f"Saved graded convoy image: {out_path} ({result.size})")

    # Also save a 600px preview
    thumb = result.resize((600, int(600 * result.height / result.width)))
    thumb.save("docs/inspection/thumb-chile-graded.jpg")

if __name__ == "__main__":
    grade_motorcade()
