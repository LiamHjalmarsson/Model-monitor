import type { Brand } from "../../api/brand";
import { BrandCard } from "./Card";
import { CreateBrandButton } from "./CreateButton";

export default function Brands () {
    return (
        <section>
            <h2 className="text-xl font-semibold text-gray-dark mb-md">
                Your Brands
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-lg">
                {brands.map((brand: Brand) => (
                    <BrandCard key={brand.id} brand={brand} />
                ))}

                <CreateBrandButton onClick={() => setShowModal(true)} />
            </div>
        </section>
    )
}