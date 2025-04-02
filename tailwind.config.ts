
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Farmer App custom colors
				kisan: {
					"green": {
						"50": "#f7fee7",
						"100": "#ecfccb",
						"200": "#d9f99d",
						"300": "#bef264",
						"400": "#a3e635",
						"500": "#84cc16",
						"600": "#65a30d",
						"700": "#4d7c0f",
						"800": "#3f6212",
						"900": "#365314",
						"950": "#1a2e05"
					},
					"brown": {
						"50": "#fefbf3",
						"100": "#faebd1",
						"200": "#f5d59a",
						"300": "#efb85c",
						"400": "#eaa335",
						"500": "#e7941e",
						"600": "#d17818",
						"700": "#ad5c17",
						"800": "#854d0e",
						"900": "#723e11",
						"950": "#432105"
					},
					"gold": {
						"50": "#fefce8",
						"100": "#fef9c3",
						"200": "#fef08a",
						"300": "#fde047",
						"400": "#facc15",
						"500": "#eab308",
						"600": "#ca8a04",
						"700": "#a16207",
						"800": "#854d0e",
						"900": "#713f12",
						"950": "#422006"
					},
					"cream": {
						"50": "#f9f9f2",
						"100": "#f7fee7",
						"200": "#edfcce",
						"300": "#def3a2",
						"400": "#c8e16c",
						"500": "#aac840",
						"600": "#88a828",
						"700": "#66801f",
						"800": "#52661e",
						"900": "#3e4c17",
						"950": "#1f2809"
					},
					"charcoal": {
						"50": "#f9fafb",
						"100": "#f3f4f6",
						"200": "#e5e7eb",
						"300": "#d1d5db",
						"400": "#9ca3af",
						"500": "#6b7280",
						"600": "#4b5563",
						"700": "#374151",
						"800": "#1f2937",
						"900": "#111827",
						"950": "#030712"
					}
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'bounce-slow': {
					'0%, 100%': {
						transform: 'translateY(0)',
					},
					'50%': {
						transform: 'translateY(-10px)',
					},
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'bounce-slow': 'bounce-slow 3s infinite',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
