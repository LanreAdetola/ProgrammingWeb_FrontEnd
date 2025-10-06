
# ProgrammingWeb_FrontEnd

This is a Vue.js web application for managing camping spots, user profiles, and admin dashboards.

## Backend API

The backend for this project is available at:

[ProgrammingWeb_BackEnd_API](https://github.com/LanreAdetola/ProgrammingWeb_BackEnd_API.git)

## Development Environment Notes

This project uses Vue CLI and modern webpack, which no longer polyfills Node.js core modules by default. To resolve compatibility issues with packages like `bcryptjs`, `crypto-browserify`, and `asn1.js`, the following polyfills have been added in `vue.config.js`:

- `crypto-browserify` for `crypto`
- `stream-browserify` for `stream`
- `vm-browserify` for `vm`

If you encounter module resolution errors (e.g., "Module not found: Can't resolve 'crypto'"), ensure these polyfills are installed and referenced in `vue.config.js` under `configureWebpack.resolve.fallback`.

### Troubleshooting

- If you see deprecation warnings about the `https` option in `devServer`, you can safely ignore them for development. For future compatibility, consider updating to the latest Vue CLI and webpack configuration standards.

- For other missing core modules, install the appropriate browserify polyfill and add it to the fallback configuration.


## Project Structure
### ProgrammingWeb_FrontEnd

```
src/
	App.vue
	main.js
	router.js
	assets/
	components/
		AdminDashboard.vue
		AllCampingSpots.vue
		DashBoard.vue
		event-bus.js
		FooterBar.vue
		HomePage.vue
		ImageUpload.vue
		ListProperty.vue
		LoginPage.vue
		NavigationBar.vue
		SearchForm.vue
		SearchResults.vue
		SingularCampingSpot.vue
		SpotProfile.vue
		UserInfo.vue
		UserInfoForm.vue
		UserPage.vue
		ViewCampingSpot.vue
		utils/
			delay.js
			user.js
```

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run serve
```

## Main Features

- Home page and navigation bar
- User login and authentication
- User profile and info management
- Dashboard for users and admins
- Search and view camping spots
- List and view property details
- Image upload functionality
- Admin dashboard for management

## Key Files

- `App.vue`: Root Vue component
- `main.js`: Application entry point
- `router.js`: Vue Router configuration
- `components/`: Contains all UI components and utilities

## License

MIT

