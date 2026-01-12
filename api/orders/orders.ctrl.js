const OrderModel = require('../../models/orders');

const projection = {
    userId: 1,
    products: 1,
    totalPrice: 1,
    status: 1,
}

const getOrdersHandler = async (req, res) => {
    const orders = await OrderModel.find({totalPrice: {$gt: 500}}, projection)
    res.status(200).json({data: orders})
}

const getOrdersByIdHandler = async (req, res) => {
    const orderId = req.params.id;
    const order = await OrderModel.findById(orderId)
    
    if (!order) {
        return res.status(404).json({data: `Order with id ${orderId} not found`});
    }
    
    res.status(200).json({data: order})
}

const postOrdersHandler = async (req, res) => {
    const {userId, products, totalPrice, status, scheduleDate } = req.body
    const newOrder = await OrderModel.create({
        userId: userId,
        products: products,
        totalPrice: totalPrice,
        status: status,
        scheduleDate: scheduleDate
    })
    res.status(201).json({data: newOrder})
}

const createOrdersHandler = async (req, res) => {
    const orders = await OrderModel.insertMany(req.body)
    res.status(201).json({data: orders})
}

const putOrdersByIdHandler = async (req, res) => {
    const orderId = req.params.id;
    const { status } = req.body
    const order = await OrderModel.findById(orderId)
    
    if (!order) {
        return res.status(404).json({data: `Order with id ${orderId} not found`});
    }
    
    order.status = status
    await order.save()
    
    res.status(200).json({data: order})
}

const updateOrdersHandler = async (req, res) => {
    const orders = await OrderModel.updateMany({status: 'pending'}, {status: 'confirmed'})
    res.status(200).json({data: 'Status of orders updated'})
}

const deleteOrderByIdHandler = async (req, res) => {
    const orderId = req.params.id;

    const order = await OrderModel.findByIdAndDelete(orderId)

    if (!order) {
        return res.status(404).json({ data: `Order with id ${orderId} not found`})
    }

    return res.status(200).json({ data: `Order with id ${orderId} deleted`})
}

const deleteOrdersHandler = async (req, res) => {
    const orders = await OrderModel.deleteMany({status: 'cancelled'})
    res.status(200).json({data: 'Orders with status "cancelled" deleted'})
}

const renderOrders = async (req, res) => {
    const orders = await OrderModel.find()
    .populate('userId')
    .populate('products')
    const data = {
        title: 'Orders',
        orders: orders,
        order: null
    }
    res.render('orders.ejs', data);
}

const renderOrdersById = async (req, res) => {
    const orderId = req.params.id
    const order = await OrderModel.findById(orderId)
    .populate('userId')
    .populate('products')
    const data = {
        title: 'Orders',
        order: order,
        orders: null
    }
    res.render('orders.ejs', data);
}

module.exports = {
    getOrdersHandler,
    getOrdersByIdHandler,
    postOrdersHandler,
    createOrdersHandler,
    putOrdersByIdHandler,
    updateOrdersHandler,
    deleteOrderByIdHandler,
    deleteOrdersHandler,
    renderOrders,
    renderOrdersById
}
