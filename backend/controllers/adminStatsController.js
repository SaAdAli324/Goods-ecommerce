import Orders from "../models/orders.js";

export const getAdminStats = async (req, res) => {
    try {
        console.log("am working");

        const stats = await Orders.aggregate([
            {
                $facet: {
                    totalOrders: [{ $count: "count" }],
                    pendingOrders: [{ $match: { status: "Pending" } },
                    { $count: "count" }
                    ],

                    realRevenue: [
                        {
                            $match:
                                { status: "Delivered" }
                        },
                        {
                            $group: {
                                _id: null,
                                total: { $sum: "$totalAmount" }
                            }
                        }
                    ],
                    potentialRevenue: [
                        {
                            $match: {
                                status: { $in: ["Pending", "Processing", "Shipped" ,"Delivered"] }
                            }
                        }, {
                            $group: {
                                _id: null,
                                total: { $sum: '$totalAmount' }
                            }
                        }
                    ]
                }
            }
        ])
        const data = stats[0]
        console.log(data);

        res.status(200).json({
            totalOrders: data.totalOrders[0]?.count || 0,
            pendingOrders: data.pendingOrders[0]?.count || 0,
            realRevenue: data.realRevenue[0]?.total || 0,
            potentialRevenue: data.potentialRevenue[0]?.total || 0,
        })
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch admin stats" });
    }
}

export const getMonthlyRevenue = async (req, res) => {
    try {
        const monthlyRevenue = await Orders.aggregate([

            {
                $match: { status: "Delivered" },
            },
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    revenue: { $sum: "$totalAmount" }
                }
            },
            { $sort: { _id: 1 } },
            {
                $project: {
                    _id: 0,
                    month: {
                        $arrayElemAt: [
                            ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                            { $subtract: ["$_id", 1] }
                        ]
                    },
                    revenue: 1
                }
            }
        ])
        res.status(200).json(monthlyRevenue)
    } catch (error) {
        res.status(500).json({ message: error }, "error occured")
    }
}

export const getTopSellingProducts = async (req, res) => {
    try {
        const TopProducts = await Orders.aggregate([
            { $match: { status: "Delivered" } },
            { $unwind: "$products" },
            {
                $group: {
                    _id: "$products.productId",
                    totalSold: { $sum: "$products.quantity" },
                    totalRevenue: { $sum: { $multiply: ["$products.priceAtPurchase", "$products.quantity"] } }
                }
            }
            ,
            { $sort: { totalSold: -1 } }
            ,
            { $limit: 5 },
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "_id",
                    as: "productInfo"
                }
            }
            ,
            { $unwind: "$productInfo" },
            {
                $project: {
                    _id: 1,
                    name: "$productInfo.productName",
                    image: {$arrayElemAt:["$productInfo.productImage.path",0]},           
                    price: "$productInfo.price",
                    totalSold: 1,
                    totalRevenue: 1
                }
            }
        ])
        res.status(200).json(TopProducts)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "failed to fetch top products" })
    }
}