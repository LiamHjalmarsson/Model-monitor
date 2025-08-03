import seedBrands from "./seed/brands.js";
import seedRatings from "./seed/ratings.js";
import seedResponses from "./seed/responses.js";
import seedUsers from "./seed/users.js";

async function seed() {
	try {
		await seedUsers();

		await seedBrands();

		await seedResponses();

		await seedRatings();

		console.log("Seed completed");

		process.exit(0);
	} catch (err) {
		console.error("Seed failed:", err);
		process.exit(1);
	}
}

seed();
