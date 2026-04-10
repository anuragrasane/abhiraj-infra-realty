# 5. Floor Plans

Project brochures include multiple floor plan types.

Examples from the brochures:

### Rajyog Project

* Ground Floor Plan (Parking + Shops + Lift + Lobby)
* Typical Floor Plan (Residential floors)
* 1 BHK Unit Plan
* 2 BHK Unit Plan


### Garden Bliss Project

* 3 BHK Luxury Apartment Layout
* Living + Dining
* Bedrooms with walk-in wardrobes
* Balcony and utility space


### New Jadhav Apartment

* Multiple flat layouts with balcony and passage areas


Schema example:

```
floorPlans: [
 {
  type: "Ground Floor Plan",
  image: "ground-floor.jpg"
 },
 {
  type: "Typical Floor Plan",
  image: "typical-floor.jpg"
 },
 {
  type: "1 BHK Unit Plan",
  image: "1bhk-plan.jpg"
 }
]
```

---

# 6. Unit Types

Projects may include multiple apartment configurations.

Examples extracted:

| Unit Type        | Projects             |
| ---------------- | -------------------- |
| 1 BHK            | Rajyog               |
| 2 BHK            | Rajyog               |
| 3 BHK            | Garden Bliss         |
| Multiple layouts | New Jadhav Apartment |

Schema example:

```
units: [
 {
  type: "1 BHK",
  carpetArea: "",
  balconyArea: ""
 },
 {
  type: "2 BHK",
  carpetArea: "",
  balconyArea: ""
 }
]
```

---

# 7. Amenities

Amenities listed across brochures include:

* Gazebo
* Yoga space
* Terrace garden
* Terrace sit-out
* CCTV surveillance
* Allotted parking
* Solar system for common areas
* Lift with battery backup
* Video door phone
* POP ceiling for hall


Example schema:

```
amenities: [
 { name: "Gazebo" },
 { name: "Yoga Space" },
 { name: "Terrace Garden" },
 { name: "CCTV Security" },
 { name: "Lift with Battery Backup" },
 { name: "Video Door Phone" }
]
```

---

# 8. Specifications

Specifications define construction and material quality.

### Kitchen

* Granite kitchen platform
* Stainless steel sink
* Glazed tiles up to platform height
* RO water provision


### Doors & Windows

* Decorative main door
* Night latch with name plate
* Laminated frames
* Sliding windows with mosquito net


### Flooring

* Vitrified tiles in all rooms


### Bathroom

* Anti-skid flooring
* Granite door frames
* Concealed plumbing


### Electrical

* Concealed wiring
* Modular switches
* Inverter point
* AC point in master bedroom


### Structure

* RCC earthquake-resistant structure


Example schema:

```
specifications: {
 kitchen: [],
 flooring: [],
 doorsWindows: [],
 bathroom: [],
 electrical: [],
 structure: []
}
```

---

# 9. Parking Details

Parking information appears in the brochures.

Examples:

* Mechanical parking system
* Stilt parking
* Dedicated parking for each flat
* EV charging provision

Schema example:

```
parking: {
 type: "Mechanical Parking",
 evCharging: true,
 planImage: "parking-plan.jpg"
}
```

---

# 10. Sustainability Features

Environmental features mentioned:

* Solar energy system for common lighting
* Rainwater harvesting
* Bore well water supply


Example:

```
sustainability: [
 "Solar energy system",
 "Rainwater harvesting",
 "Borewell water supply"
]
```

---

# 11. Location & Connectivity

Location information can include nearby landmarks.

Example from Garden Bliss brochure:

### Transport

* Peth Road – 600 m
* Dindori Road – 950 m
* Mumbai Agra Highway – 4.2 km
* Railway station – 10 km


### Education

* PVG College – 550 m
* K.K Wagh School – 4 km


### Hospitals

* RMD Hospital – 50 m
* Ashray Hospital – 170 m


Example schema:

```
location: {
 address: "",
 nearby: [
  { place: "Hospital", distance: "170 m" },
  { place: "School", distance: "4 km" }
 ]
}
```

---

# 12. Developer Details

Information about project developers.

Example fields:

* Developer name
* Architect
* Structural consultant
* Legal advisor


Example:

```
developer: {
 name: "Somvijay Developers",
 architect: "PDP Architects",
 structuralConsultant: "Er. Manish Bothra",
 legalAdvisor: "Adv. Manoj Chavhan"
}
```

---

# 13. Contact Information

Example fields:

* Sales contact
* Phone numbers
* Office address

Example:

```
contact: {
 salesPerson: "Manish Dhivar",
 phone: "9890666246",
 officeAddress: ""
}
```

---

# 14. Images / Gallery

Images from brochures should be added to the gallery.

Example:

```
gallery: [
 "project-front.jpg",
 "living-room.jpg",
 "bedroom.jpg",
 "rooftop.jpg"
]
```

---

# Final Schema Overview

```
project = {
 basicInfo: {},
 overview: {},
 highlights: [],
 units: [],
 amenities: [],
 specifications: {},
 floorPlans: [],
 gallery: [],
 parking: {},
 sustainability: [],
 location: {},
 developer: {},
 contact: {}
}
```

---

# Recommended UI Structure

Project detail page layout:

1. Hero section (project image)
2. Project overview
3. Project highlights
4. Amenities
5. Floor plans
6. Unit types
7. Specifications
8. Gallery
9. Location & connectivity
10. Parking
11. Developer details
12. Contact / booking section

---

This README ensures that **all information available in the brochures can be captured and stored in your schema**.
