import type { item } from "../app/interface";
import { client } from "../sanity/lib/client";

export const getData = async (
    category: string,
    page: number,
    itemsPerPage: number,
    sortBy?: string
): Promise<{ data: item[]; totalCount: number }> => {
    const start = (page - 1) * itemsPerPage;
    const end = page * itemsPerPage;

    const [sortField, sortDirection] = sortBy
        ? sortBy.split(" ")
        : ["_createdAt", "desc"];

    const dataQuery = `*[_type == "${category}"] | order(product->${sortField} ${sortDirection}) {
		_id,
		name,
		"product": product-> {
			name,
			"category": category->name,
			price,
			"slug": slug.current,
			description,
			"imageUrl": images[0].asset->url
		},
	}[${start}...${end}]`;

    console.log(dataQuery);

    const countQuery = `count(*[_type == "${category}"])`;

    const [data, totalCount] = await Promise.all([
        client.fetch(dataQuery),
        client.fetch(countQuery),
    ]);

    return { data, totalCount };
};
