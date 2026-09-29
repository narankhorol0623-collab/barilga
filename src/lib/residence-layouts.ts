import type { ResidenceLayout } from "./residence";

// Supplied plan sheets; these describe layouts, not sale availability.
export const residenceLayouts: ResidenceLayout[] = [
  {
    "block_slug": "n7",
    "code": "A",
    "area": 101.23,
    "rooms": 4,
    "spaces": [
      [
        "Үүдний хэсэг",
        4.03
      ],
      [
        "Зочны өрөө, гал тогоо",
        33.61
      ],
      [
        "Ариун цэврийн өрөө",
        3.94
      ],
      [
        "Унтлагын өрөө",
        13.93
      ],
      [
        "Унтлагын өрөө",
        14.21
      ],
      [
        "Унтлагын өрөө",
        14.35
      ],
      [
        "Ариун цэврийн өрөө",
        4.83
      ],
      [
        "Коридор",
        8.85
      ],
      [
        "Тагт",
        3.5
      ]
    ],
    "plan_image": "/plans/a.jpg"
  },
  {
    "block_slug": "n7",
    "code": "B",
    "area": 81.0,
    "rooms": 3,
    "spaces": [
      [
        "Үүдний хэсэг",
        3.24
      ],
      [
        "Зочны өрөө, гал тогоо",
        32.84
      ],
      [
        "Ариун цэврийн өрөө",
        3.73
      ],
      [
        "Ариун цэврийн өрөө",
        5.32
      ],
      [
        "Унтлагын өрөө",
        12.05
      ],
      [
        "Унтлагын өрөө",
        13.27
      ],
      [
        "Коридор",
        5.87
      ],
      [
        "Тагт",
        4.68
      ]
    ],
    "plan_image": "/plans/b.jpg"
  },
  {
    "block_slug": "n7",
    "code": "C",
    "area": 68.18,
    "rooms": 3,
    "spaces": [
      [
        "Үүдний хэсэг",
        4.43
      ],
      [
        "Зочны өрөө, гал тогоо",
        23.53
      ],
      [
        "Ариун цэврийн өрөө",
        3.51
      ],
      [
        "Ариун цэврийн өрөө",
        5.08
      ],
      [
        "Унтлагын өрөө",
        13.09
      ],
      [
        "Унтлагын өрөө",
        13.17
      ],
      [
        "Тагт",
        5.4
      ]
    ],
    "plan_image": "/plans/c.jpg"
  }
];

// Add interior renders here when they are ready.
export const residenceDesigns: Record<string, { src: string; caption: string }[]> = { A: [], B: [], C: [] };
