import sys
from rembg import remove, new_session
from PIL import Image

def test():
    print("Initializing rembg session...")
    session = new_session("isnet-general-use")
    input_path = ".agents/teamwork/explorer_m1_fix1/cardekho_front_left.jpg"
    output_path = ".agents/teamwork/explorer_m1_fix1/temp_clavis_ev_isnet.png"
    
    img = Image.open(input_path)
    print(f"Input image loaded: {img.size}")
    
    output = remove(img, session=session)
    output.save(output_path)
    print(f"Saved transparent cutout to: {output_path}")

if __name__ == "__main__":
    test()
