# India-first brief
Company: Victor Mobility Pvt. Ltd.
Tagline: On Time Every Time.
Deadline: four days from implementation start; organise work as Day 1–Day 4.
Current goal: a complete, responsive India marketing and enquiry website that feels premium, uses the supplied brand identity, and is easy for Abhinay to update.

Primary audience: HR/admin/facilities/transport managers, event organisers and people arranging airport or luxury transportation.
The website must communicate both daily/group transport capability and luxury service.

## User decisions, 4 October 2026
- Antigravity is the main builder. The user has Google Pro and is comfortable with its available usage.
- Codex provides direction and focused reviews.
- The supplied standalone original logo controls the artwork and colours.
- Services and cities can be taken from the shared brochure; the user will edit them later.
- AI images are authorised as temporary website assets and will later be replaced with real photographs.
- Finish India first. Start UAE afterwards.
- Domain has not yet been purchased.

## Release routes
/ -> temporary redirect to /india
/india
/india/services
/india/services/[slug]
/india/fleet
/india/about
/india/contact
/india/privacy

Only publish valid service slugs from the content file. Unknown slugs return not-found.
Use the service template for employee-transportation, bus-shuttle-transport, event-transportation, airport-transfers, chauffeur-luxury and rent-a-car.

## First-release enquiry behaviour
Use "Discuss your requirement" and "Request a quote" to lead to /india/contact.
A short enquiry form prepares a WhatsApp draft for +91 93965 46950.
Its final button reads "Continue on WhatsApp" and explains that the message opens in WhatsApp for the visitor to send.
Use name, service, city and requirement as the core fields. Avoid requiring a phone/email twice when the visitor is already sending through WhatsApp.
Show the request text before handing it off where practical.
Provide "Call us" using +91 91007 77768 as an alternative.
Do not create a fake submit endpoint. Email delivery can be connected if a real inbox/provider is available during the build.

## Deferred scope
UAE content and launch; global selector; Arabic; customer accounts; payments; automated booking confirmation; live fleet availability; complex 3D scenes.
The code should make regional extension straightforward without spending this deadline implementing those features.

## Definition of complete
Approved logo and new tagline; responsive pages; usable navigation; working phone/WhatsApp enquiry journey; editable content; appropriate image handling; reduced-motion and keyboard support; truthful metadata; deployable production build and a functioning preview.

