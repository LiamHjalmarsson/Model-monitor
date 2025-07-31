import React from "react";

interface Header {
	title: string;
	subtitle?: string;
	children?: React.ReactNode;
}

export default function Header({ title, subtitle, children }: Header) {
	return (
		<div className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center">
			<div>
				<h1 className="text-4xl font-extrabold text-gray-900 mb-2">
					{title}
				</h1>
				{subtitle && (
					<p className="text-lg text-gray-600 whitespace-pre-wrap">
						{subtitle}
					</p>
				)}
			</div>
			{children && (
				<div className="mt-4 sm:mt-0 flex gap-3">{children}</div>
			)}
		</div>
	);
}
