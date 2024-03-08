const blendSchema = {
	name: "blend",
	title: "Blend",
	type: "document",
	fields: [
		{
			name: "name",
			title: "Blend Name",
			type: "string",
		},
		{
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "name",
			},
		},
		{
			name: "description",
			title: "Description",
			type: "text",
		},
		{
			name: "image",
			title: "Image",
			type: "image",
		},
	],
};

export default blendSchema;