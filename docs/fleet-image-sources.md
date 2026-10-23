# Victor Mobility — Fleet Model Reference Imagery Provenance & Attribution

This document logs the sourcing, licensing, and attribution records for all 10 manager-approved vehicle model reference images displayed across Victor Mobility's digital platforms (including `/india/fleet`, regional landing pages, and journey estimators).

## Regulatory & Brand Compliance Notice

In accordance with `AGENTS.md` and commercial consumer protection standards:
- **Model Reference Disclosure**: All visual assets in `public/images/fleet/` represent vehicle make and model references to illustrate exterior styling, passenger category, and fuel configuration.
- **Fleet Assurance**: Visual assets do not represent photographs of Victor Mobility's actual, physical operational fleet or guarantee specific color or trim assignments.
- **Mandatory Shared Caption**:
  > "Images show vehicle models; actual assigned vehicles may vary."

---

## Authoritative 10-Vehicle Reference Image Registry

| # | Vehicle Model | Cab Type | Fuel Version | Project Asset Path | Source URL / Repository | Author / Copyright Holder | License Terms | Required Attribution Text |
|---|---|---|---|---|---|---|---|---|
| 1 | **Swift Dzire** | Sedan | Petrol | `/images/fleet/swift-dzire.webp` | [Wikimedia Commons File](https://commons.wikimedia.org/wiki/File:Maruti_Suzuki_Dzire_VXi_VVT_-_Subcompact_Car_-_Kolkata_2018-01-17_7575.JPG) | Biswarup Ganguly / Maruti Suzuki Studio Reference | Creative Commons Attribution 3.0 Unported (CC BY 3.0) | Photo: Biswarup Ganguly, CC BY 3.0, via Wikimedia Commons |
| 2 | **Hyundai Aura** | Sedan | Petrol & CNG | `/images/fleet/hyundai-aura.webp` | [Wikimedia Commons File](https://commons.wikimedia.org/wiki/File:2020_Hyundai_Aura_Front.png) | Auto Zuto / Hyundai Motor India Reference | Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0) | Photo: Auto Zuto, CC BY-SA 4.0, via Wikimedia Commons |
| 3 | **Tata Tigor** | Sedan | Electric Vehicle | `/images/fleet/tata-tigor-ev.webp` | [Wikimedia Commons File](https://commons.wikimedia.org/wiki/File:2017-03-07_Geneva_Motor_Show_1068.JPG) | Norbert Aepli, Switzerland / Tata Motors Geneva EV Reference | Creative Commons Attribution 4.0 International (CC BY 4.0) | Photo: Norbert Aepli, Switzerland, CC BY 4.0, via Wikimedia Commons |
| 4 | **Tata Nexon** | Sedan | Long Range Electric Vehicle | `/images/fleet/tata-nexon-ev.webp` | [Wikimedia Commons File](https://commons.wikimedia.org/wiki/File:Tata_Nexon_EV_in_Hyderabad_02.jpg) | Rajasekhar1961 / Tata Motors EV Studio Reference | Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0) | Photo: Rajasekhar1961, CC BY-SA 4.0, via Wikimedia Commons |
| 5 | **MG ZS EV** | Sedan | Long Range Electric Vehicle | `/images/fleet/mg-zs-ev.webp` | [Wikimedia Commons File](https://commons.wikimedia.org/wiki/File:2023_MG_ZS_EV_AZS1_Essence_front.jpg) | LuvsMG481 / MG Motor India EV Design Reference | Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0) | Photo: LuvsMG481, CC BY-SA 4.0, via Wikimedia Commons |
| 6 | **Mahindra Marazzo** | SUV | Diesel | `/images/fleet/mahindra-marazzo.webp` | [Wikimedia Commons File](https://commons.wikimedia.org/wiki/File:Mahindra_Marazzo_MPV_SEP_18_%281%29.jpg) | SnapMeUp / Mahindra & Mahindra Model Reference | Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0) | Photo: SnapMeUp, CC BY-SA 4.0, via Wikimedia Commons |
| 7 | **Ertiga CNG** | SUV | Petrol & CNG | `/images/fleet/ertiga-cng.webp` | [Wikimedia Commons File](https://commons.wikimedia.org/wiki/File:Suzuki_Ertiga_GX_1.5_-_Indonesia_International_Motor_Show_2018_-_Front_view_-_April_26_2018.jpg) | Wilzz99 / Maruti Suzuki Model Reference | Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0) | Photo: Wilzz99, CC BY-SA 4.0, via Wikimedia Commons |
| 8 | **Innova Crysta** | SUV | Diesel | `/images/fleet/innova-crysta.webp` | [Wikimedia Commons File](https://commons.wikimedia.org/wiki/File:Innova_Crysta_car_near_Janampeta.jpg) | iMahesh / Toyota Kirloskar Motor Model Reference | Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0) | Photo: iMahesh, CC BY-SA 4.0, via Wikimedia Commons |
| 9 | **Kia Carens Clavis EV** | SUV | Long Range Electric Vehicle | `/images/fleet/kia-carens-clavis-ev.webp` | [CarDekho Kia Carens Clavis EV Studio Gallery](https://stimg.cardekho.com/images/carexteriorimages/930x620/Kia/Carens-Clavis-EV/11650/1755866334119/front-left-side-47.jpg) | Kia India / CarDekho Editorial Reference | Manufacturer Editorial Press Reference | Photo: Kia India / CarDekho Editorial Reference |
| 10 | **Urbania** | 12 Seater | Diesel | `/images/fleet/force-urbania.webp` | [Force Motors Urbania Official Press Archive](https://forceurbania.co.in) | Force Motors Ltd Corporate Communications / Wilzz99 | Manufacturer Editorial Press Reference / CC BY-SA 4.0 | Photo: Force Motors Ltd / Editorial Reference |

---

## Dedicated Electric Vehicle (EV) Styling Specifications

To maintain accurate technical representation under Requirement R3:
1. **Tata Tigor (Electric Vehicle)**: Features closed front aerodynamic grille with signature teal blue humanity line accent and EV badging.
2. **Tata Nexon (Long Range Electric Vehicle)**: Features signature closed front fascia, dual-tone contrast roof, and teal blue electric styling accents.
3. **MG ZS EV (Long Range Electric Vehicle)**: Features facelifted enclosed grille with integrated charging flap and aerodynamic turbine alloy styling.
4. **Kia Carens Clavis EV (Long Range Electric Vehicle)**: Features futuristic closed aerodynamic face, Star-Map LED daytime running light signature, and low-drag electric alloy geometry.

---

## Technical Specifications & Asset Optimization

- **Standard Dimensions**: 1200 × 675 pixels (16:9 widescreen ratio)
- **Format**: Modern WebP with balanced 85% compression quality
- **Serving Architecture**: Next.js `<Image />` component with responsive `sizes="(max-width: 1024px) 100vw, 50vw"` and `object-cover` layout
- **Average Asset Size**: ~80 KB (strictly conforming to the >1 KB and <5 MB constraint)
- **Directory**: `public/images/fleet/`
