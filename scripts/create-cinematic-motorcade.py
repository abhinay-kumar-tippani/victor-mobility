import numpy as np
from PIL import Image, ImageEnhance, ImageFilter

def create_cinematic_motorcade():
    src_path = "public/images/candidate-chile-motorcade.jpg"
    img = Image.open(src_path).convert("RGB")
    orig_w, orig_h = img.size

    # Crop:Focus on the motorcade convoy
    # Vehicles are centered horizontally and vertically
    # Let's crop from y=500 to y=2500, x=500 to x=4256
    # This removes the empty left edge while keeping the aircraft tail and the entire motorcade
    crop_box = (500, 520, 4256, 2520)
    cropped = img.crop(crop_box)
    w, h = cropped.size
    print(f"Cropped to: {w}x{h}")

    arr = np.array(cropped, dtype=np.float32) / 255.0

    # 1. Luminance
    lum = 0.299 * arr[:, :, 0] + 0.587 * arr[:, :, 1] + 0.114 * arr[:, :, 2]

    # Target brand colors:
    # Deep obsidian base: #070A12 -> (7, 10, 18) / 255
    obsidian = np.array([7 / 255.0, 10 / 255.0, 18 / 255.0], dtype=np.float32)
    # Brand dark indigo: #161933 -> (22, 25, 51) / 255
    dark_indigo = np.array([22 / 255.0, 25 / 255.0, 51 / 255.0], dtype=np.float32)
    # Brand accent corporate blue: #2D5090 -> (45, 80, 144) / 255
    brand_blue = np.array([45 / 255.0, 80 / 255.0, 144 / 255.0], dtype=np.float32)
    # Metallic ice highlight: (215, 225, 250) / 255
    ice_high = np.array([215 / 255.0, 225 / 255.0, 250 / 255.0], dtype=np.float32)

    # 2. Convert exposure from bright daytime to dramatic evening dusk:
    # Strong non-linear contrast curve: shadows drop into deep black, highlights stay crisp
    darkened = np.power(arr, 1.85)

    # Cool down temperature (eliminate daytime yellow/beige cast from concrete)
    # Lower red, lower green, enhance cool blue tone
    darkened[:, :, 0] *= 0.55
    darkened[:, :, 1] *= 0.68
    darkened[:, :, 2] *= 1.20
    darkened = np.clip(darkened, 0.0, 1.0)

    # 3. Y-axis & X-axis masks for seamless background blending:
    y_coords = np.linspace(0, 1, h)[:, np.newaxis]
    x_coords = np.linspace(0, 1, w)[np.newaxis, :]

    # Top fade: sky smoothly turns into solid obsidian #070A12
    # Sky is roughly top 30% of image
    sky_fade = np.clip((0.32 - y_coords) / 0.32, 0.0, 1.0) ** 1.2

    # Bottom fade: tarmac foreground turns into solid obsidian #070A12
    # Bottom 40% of image is open tarmac
    bottom_fade = np.clip((y_coords - 0.55) / 0.45, 0.0, 1.0) ** 1.3

    # Left fade: left side of image (where text will sit) turns into deep obsidian
    left_fade = np.clip((0.45 - x_coords) / 0.45, 0.0, 1.0) ** 1.2

    # Combine edge fades
    edge_mask = np.maximum(sky_fade * 0.95, bottom_fade * 0.95)
    edge_mask = np.maximum(edge_mask, left_fade * 0.85)

    # 4. Blend image with Victor brand colors
    out = np.zeros_like(darkened)
    for c in range(3):
        # Base tonemapping
        out[:, :, c] = darkened[:, :, c] * 0.70 + dark_indigo[c] * 0.20 + brand_blue[c] * 0.10
        # Apply edge fades into obsidian
        out[:, :, c] = out[:, :, c] * (1.0 - edge_mask) + obsidian[c] * edge_mask

    out = np.clip(out, 0.0, 1.0)

    # Convert to PIL
    result = Image.fromarray(np.uint8(out * 255.0))

    # Boost contrast and sharpness for polished metallic look
    contrast = ImageEnhance.Contrast(result)
    result = contrast.enhance(1.4)
    sharpness = ImageEnhance.Sharpness(result)
    result = sharpness.enhance(1.3)

    out_path = "public/images/india/hero-executive-fleet-cinematic.jpg"
    result.save(out_path, quality=95)
    print(f"Saved: {out_path} ({result.size})")

    # Save thumbnail for inspection
    thumb = result.resize((800, int(800 * result.height / result.width)))
    thumb.save("docs/inspection/thumb-hero-cinematic.jpg")
    print("Saved preview: docs/inspection/thumb-hero-cinematic.jpg")

if __name__ == "__main__":
    create_cinematic_motorcade()
