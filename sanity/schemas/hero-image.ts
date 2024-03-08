const heroImageSchema = {
    name: "heroImage",
    title: "Hero Image",
    type: "document",
    fields: [
        {
            name: "image1",
            title: "Image 1",
            type: "image",
            options: {
                hotspot: true,
            },
        },
        {
            name: "image2",
            title: "Image 2",
            type: "image",
            options: {
                hotspot: true,
            },
        },
    ],
};

export default heroImageSchema;
