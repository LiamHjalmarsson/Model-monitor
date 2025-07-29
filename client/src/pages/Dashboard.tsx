import React from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import Card from "../components/ui/Card";

const Dashboard: React.FC = () => {
	return (
		<div className="min-h-screen flex bg-gray-100">
			{/* Sidebar */}
			<aside className="w-64 bg-white/20 backdrop-filter backdrop-blur-lg border-r border-white/30 shadow-lg">
				<Sidebar />
			</aside>

			<div className="flex-1 flex flex-col">
				{/* Header */}
				<header className="bg-white/30 backdrop-filter backdrop-blur-md border-b border-white/30 shadow-sm px-6 py-4">
					<Header />
				</header>

				{/* Main Content */}
				<main className="flex-1 p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					<Card title="Overview">
						{/* Overview content goes here */}
						<p className="text-gray-700">
							Welcome to your dashboard!
						</p>
					</Card>
					<Card title="Statistics">
						{/* Statistics charts or summaries */}
						<p className="text-gray-700">
							Your stats will appear here.
						</p>
					</Card>
					<Card title="Recent Activity">
						{/* Recent activity list */}
						<p className="text-gray-700">No recent activity.</p>
					</Card>
					{/* Add more cards as needed */}
				</main>
			</div>
		</div>
	);
};

export default Dashboard;
