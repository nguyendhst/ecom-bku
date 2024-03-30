'use client';

import { toVND } from "../../../lib/utils";
import { useCheckoutForm } from "../page";
import FormWrapper from "./form-wrapper";

export const DeliveryOptionsForm = () => {
	const { setDeliveryOption } = useCheckoutForm();

	return (
		<FormWrapper
			title="Delivery Options"
			description="Select your delivery method"
		>
			<div className="bg-white p-4 mt-2 rounded-md border border-indigo-700">
				<div className="flex justify-between items-center">
					<div className="w-full">
						<div className="flex justify-between items-center my-2 mb-4">
							<div className="flex items-center">
								<input
									type="radio"
									name="delivery_option"
									id="fast"
									value="fast"
									onChange={() =>
										setDeliveryOption({
											type: "fast",
											time: "",
										})
									}
								/>
								<label htmlFor="fast" className="ml-2">
									Fast Delivery (1-2 days)
								</label>
							</div>
							<div className="text-lg font-bold">+{toVND(50000)}</div>
						</div>
						<div className="flex justify-between items-center my-2 mb-4">
							<div className="flex items-center">
								<input
									type="radio"
									name="delivery_option"
									id="standard"
									value="standard"
									onChange={() =>
										setDeliveryOption({
											type: "standard",
											time: "",
										})
									}
								/>
								<label htmlFor="standard" className="ml-2">
									Standard Delivery (3-5 days)
								</label>
							</div>
							<div className="text-lg font-bold">+{toVND(15000)}</div>
						</div>
					</div>
				</div>
			</div>
		</FormWrapper>
	);
};
