import ResponseCard from "./Card";

export default function ResponseList () {
    return (
        <section className="space-y-xl">
            {responses.map((res) => (
                <ResponseCard
                    key={res.id}
                    response={res}
                    onRate={handleRate}
                />
            ))}

            {responses.length === 0 && (
                <p className="text-gray-500 text-sm mt-6">
                    No responses yet.
                </p>
            )}
        </section>
    )
}