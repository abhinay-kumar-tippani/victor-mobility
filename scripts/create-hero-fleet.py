import numpy as np
from PIL import Image, ImageEnhance, ImageFilter

def process_hero_fleet():
    src_path = "public/images/candidate-chile-motorcade.jpg"
    img = Image.open(src_path).convert("RGB")
    orig_w, orig_h = img.size
    print(f"Loaded original image: {orig_w}x{orig_h}")

    # 1. Cinematic Wide Aspect Ratio Crop (focused on the executive motorcade and tarmac)
    # Original is 4256 x 2832 (3:2)
    # The vehicles are located vertically between y=800 and y=2400.
    # The horizon/sky is above y=1000.
    # Let's crop from y = 500 to y = 2500 (height 2000, width 4256 -> ~2.13:1 ultrawide cinematic aspect ratio)
    crop_top = int(orig_h * 0.16)
    crop_bottom = int(orig_h * 0.88)
    cropped = img.crop((0, crop_top, orig_w, crop_bottom))
    w, h = cropped.size
    print(f"Cropped dimensions: {w}x{h}")

    # Convert to float numpy array [0, 1]
    arr = np.array(cropped, dtype=np.float32) / 255.0

    # 2. Targeted Tone & Color Conversion: Daytime -> Midnight Blue Hour
    # Compute luminance
    lum = 0.299 * arr[:, :, 0] + 0.587 * arr[:, :, 1] + 0.114 * arr[:, :, 2]

    # Target brand colors:
    # Deep obsidian: #070A12 -> (7/255, 10/255, 18/255)
    c_obsidian = np.array([7 / 255.0, 10 / 255.0, 18 / 255.0], dtype=np.float32)
    # Brand dark indigo: #1A1D36 -> (26/255, 29/255, 54/255)
    c_dark_indigo = np.array([26 / 255.0, 29 / 255.0, 54 / 255.0], dtype=np.float32)
    # Brand indigo: #31326F -> (49/255, 50/255, 111/255)
    c_indigo = np.array([49 / 255.0, 50 / 255.0, 111 / 255.0], dtype=np.float32)
    # Corporate blue: #2D5090 -> (45/255, 80/255, 144/255)
    c_blue = np.array([45 / 255.0, 80 / 255.0, 144 / 255.0], dtype=np.float32)
    # Clean metallic chrome / light highlight
    c_highlight = np.array([210 / 255.0, 220 / 255.0, 245 / 255.0], dtype=np.float32)

    # Darken and increase contrast: pull down bright daylight exposure
    # Non-linear curve to preserve dark vehicle bodies while darkening tarmac and sky
    darkened = np.power(arr, 1.55)

    # Color grading: eliminate warm daylight yellow/green, infuse deep indigo/blue
    darkened[:, :, 0] *= 0.60  # Red suppression
    darkened[:, :, 1] *= 0.72  # Green suppression
    darkened[:, :, 2] *= 1.25  # Blue enhancement
    darkened = np.clip(darkened, 0.0, 1.0)

    # Recompute luminance
    new_lum = 0.299 * darkened[:, :, 0] + 0.587 * darkened[:, :, 1] + 0.114 * darkened[:, :, 2]

    # 3. Split-toning with Victor Brand Palette:
    out = np.zeros_like(darkened)
    for c in range(3):
        # Shadows get pure obsidian
        s_weight = np.clip(1.0 - new_lum * 2.5, 0.0, 1.0)
        # Midtones get brand indigo/blue
        m_weight = np.clip(np.sin(new_lum * np.pi), 0.0, 1.0) * 0.40
        # Highlights get cool metallic silver
        h_weight = np.clip((new_lum - 0.45) * 1.8, 0.0, 1.0)

        out[:, :, c] = (
            darkened[:, :, c] * (1.0 - s_weight * 0.70 - m_weight * 0.35)
            + c_obsidian[c] * (s_weight * 0.70)
            + c_indigo[c] * (m_weight * 0.35)
            + c_highlight[c] * (h_weight * 0.18)
        )

    out = np.clip(out, 0.0, 1.0)

    # 4. Cinematic Vignettes and Edge Fades to #070A12:
    # Y-axis (top sky and bottom tarmac fades seamlessly into obsidian)
    y_coords = np.linspace(0, 1, h)[:, np.newaxis]
    top_fade = np.clip((0.28 - y_coords) / 0.28, 0.0, 1.0)
    bottom_fade = np.clip((y_coords - 0.62) / 0.38, 0.0, 1.0)

    # X-axis (left side fades softly into obsidian to create negative space for headline text)
    x_coords = np.linspace(0, 1, w)[np.newaxis, :]
    left_fade = np.clip((0.35 - x_coords) / 0.35, 0.0, 1.0)

    combined_fade = np.maximum(top_fade * 0.85, bottom_fade * 0.90)
    combined_fade = np.maximum(combined_fade, left_fade * 0.60)

    for c in range(3):
        out[:, :, c] = out[:, :, c] * (1.0 - combined_fade) + c_obsidian[c] * combined_fade

    # Convert back to PIL Image
    final_arr = np.uint8(np.clip(out * 255.0, 0, 255))
    final_img = Image.fromarray(final_arr)

    # Polish: Contrast, Sharpness, and Rich Tone
    contrast_enhancer = ImageEnhance.Contrast(final_img)
    final_img = contrast_enhancer.enhance(1.32)

    sharpness_enhancer = ImageEnhance.Sharpness(final_img)
    final_img = sharpness_enhancer.enhance(1.28)

    # Save final high-res production asset
    output_path = "public/images/india/hero-luxury-fleet-motorcade.jpg"
    final_img.save(output_path, quality=95)
    print(f"Saved production hero image: {output_path} ({final_img.size})")

    # Save inspection preview
    thumb = final_img.resize((800, int(800 * final_img.height / final_img.width)))
    thumb.save("docs/inspection/thumb-hero-motorcade-graded.jpg")
    print("Saved inspection thumb: docs/inspection/thumb-hero-motorcade-graded.jpg")

if __name__ == "__main__":
    process_hero_fleet()
