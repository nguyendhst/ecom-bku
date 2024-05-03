type EmailPayload = {
	name: string;
	email: string;
	message: string;
}

export const sendEmail = async (data: EmailPayload) => {
	// send post request to email api
	// http://ec2-52-221-206-32.ap-southeast-1.compute.amazonaws.com:8080/api/v1/send-email/send-text-mail
	// {
	//  "recipient": "@gmail.com",
	//  "msgBody": "hello",
	//  "subject": "TEST EMAIL",
	//  "attachment": null
	//}

	const response = await fetch('http://ec2-52-221-206-32.ap-southeast-1.compute.amazonaws.com:8080/api/v1/send-email/send-text-mail', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			recipient: data.email,
			msgBody: data.message,
			subject: `Order confirmation for ${data.name}`,
			attachment: null
		})
	});

	const ok = response.ok;
	const status = response.status;
	return { ok, status };
}