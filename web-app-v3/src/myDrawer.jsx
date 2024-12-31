import { clsx } from "clsx";
import AboutUs from "./AboutUs";

const openClassNames = {
	right: "translate-x-0",
	left: "translate-x-0",
	top: "translate-y-0",
	bottom: "translate-y-0",
};

const closeClassNames = {
	right: "translate-x-full",
	left: "-translate-x-full",
	top: "-translate-y-full",
	bottom: "translate-y-full",
};

const classNames = {
	right: "inset-y-0 right-0",
	left: "inset-y-0 left-0",
	top: "inset-x-0 top-0",
	bottom: "inset-x-0 bottom-0",
};

const Drawer = ({ open, setOpen, side = "right" }) => {
	return (
		<div
			id={`dialog-${side}`}
			className="relative z-30"
			aria-labelledby="slide-over"
			role="dialog"
			aria-modal="true"
			onClick={() => setOpen(!open)}
		>
			<div
				className={clsx(
					"fixed inset-0 bg-opacity-75 transition-all",
					{
						"opacity-100 duration-500 ease-in-out visible": open,
					},
					{ "opacity-0 duration-500 ease-in-out invisible": !open }
				)}
			></div>
			<div className={clsx({ "fixed inset-0 overflow-hidden": open })}>
				<div className="absolute inset-0 overflow-hidden">
					<div className={clsx("pointer-events-none fixed", classNames[side])}>
						<div
							className={clsx(
								"pointer-events-auto relative h-full transform transition ease-in-out duration-500",
								{ [closeClassNames[side]]: !open },
								{ [openClassNames[side]]: open }
							)}
							onClick={(event) => {
								event.preventDefault();
								event.stopPropagation();
							}}
						>
							<div
								className={clsx(
									"flex flex-col h-full overflow-y-scroll bg-white p-6  shadow-xl rounded-lg"
								)}
							>
								<ul className="py-6 min-h-full bg-base-200 text-base-content ">
									<li className="mb-5">
										<img
											alt="logo"
											src="/images/logo-blue.png"
											height={100}
											width={120}
										/>
									</li>
									<li className="ml-5">
										<AboutUs />
									</li>
									<li className="absolute bottom-6 left-10">
										<button
											title="Close"
											className="inline-flex items-center px-3 py-1 rounded-full sm:text-sm md:text-lg font-medium bg-blue-400 text-white hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mr-5"
											onClick={() => setOpen(!open)}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												width="24"
												height="24"
												className="main-grid-item-icon"
												fill="none"
												stroke="currentColor"
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
											>
												<polyline points="15 18 9 12 15 6" />
											</svg>{" "}
											Close
										</button>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Drawer;
