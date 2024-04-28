import { Star } from "lucide-react";

export const CustomerReviews = () => {
    const reviews = [
        {
            name: "nnguyen",
            rating: 5,
            comment:
                "Cafe mới, ngon, thơm. Hạt xay đều, dùng đúng cho máy espresso. Tạo được nhiều bọt khi pha. Nên cải thiện về bao bì, hộp giấy nên dày hơn, chắc chắn hơn.",
            date: "2024-03-06",
        },
        {
            name: "Ngo Dang Vinh",
            rating: 4,
            comment: "Hàng giao đầy đủ đóng gói cẩn thận. Rất hài lòng.",
            date: "2024-03-06",
        },
        {
            name: "Hoàng Hải Yến",
            rating: 5,
            comment:
                "Cà phê này thật sự tuyệt vời! Hương vị đậm đà, thơm ngon, và hạt cà phê được xay đều đặn. Mỗi ngày tôi đều thưởng thức một tách cà phê từ sản phẩm này và tôi không thể hài lòng hơn.",
            date: "2024-04-28",
        },
        {
            name: "Phạm Thanh Hải",
            rating: 4,
            comment:
                "Sản phẩm này đáp ứng được mong đợi của tôi. Hạt cà phê tươi và chất lượng, đóng gói cẩn thận. Tuy nhiên, tôi hy vọng rằng công ty có thể cải thiện về mặt bao bì để đảm bảo an toàn hơn cho sản phẩm.",
            date: "2024-04-28",
        },
        {
            name: "Nguyễn Thị Hà",
            rating: 5,
            comment:
                "Cà phê này thực sự xuất sắc! Hương thơm quyến rũ và hương vị đắng nhẹ nhàng, hoàn hảo cho mỗi buổi sáng của tôi. Tôi rất hài lòng với chất lượng và dịch vụ của công ty.",
            date: "2024-04-28",
        },
        {
            name: "Trần Văn Nam",
            rating: 4,
            comment:
                "Cà phê tốt, giá cả hợp lý. Tuy nhiên, tôi mong muốn công ty có thêm nhiều lựa chọn về loại cà phê để khách hàng có thêm sự đa dạng trong việc chọn lựa.",
            date: "2024-04-28",
        },
        {
            name: "Lê Thị Lan Anh",
            rating: 5,
            comment:
                "Sản phẩm này thực sự đáng giá với giá tiền của nó. Hạt cà phê chất lượng cao, đóng gói cẩn thận và vận chuyển nhanh chóng. Tôi sẽ tiếp tục mua sản phẩm này trong tương lai.",
            date: "2024-04-28",
        },
    ];

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-center">
                Customer Reviews
            </h2>

            <div className="flex flex-wrap justify-around">
                {reviews.map((review, index) => (
                    <div
                        key={index}
                        className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4"
                    >
                        <div className="border border-gray-200 rounded-lg p-4">
                            <h3 className="font-bold">{review.name}</h3>
                            <div className="flex items-center space-x-1">
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} fill="orange" />
                                ))}
                            </div>
                            <p>{review.comment}</p>
                            <p className="text-sm text-gray-500">
                                {review.date}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
