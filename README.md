# FastFeet API

An API developed using Node.js for controlling orders from a fictitious carrier: FastFeet.

---

## Application rules

- [x] The application must have two types of user: delivery person and/or administrator
- [ ] It must be possible to log in with CPF and Password
- [x] It must be possible to perform CRUD for couriers
- [x] It must be possible to perform CRUD of orders
- [ ] It must be possible to perform CRUD on recipients
- [x] It must be possible to mark an order as waiting (Available for pickup)
- [ ] It must be possible to cancel an order
- [x] It must be possible to mark an order as delivered
- [x] It must be possible to mark an order as returned
- [x] It must be possible to list orders with delivery addresses close to the delivery person's location
- [ ] It must be possible to change a user's password
- [ ] It must be possible to list a user's deliveries
- [ ] It must be possible to notify the recipient of each change in the order status

## Business rules

- [ ] Only admin type users can perform CRUD operations on orders
- [ ] Only admin type users can perform CRUD operations for delivery people
- [ ] Only admin type users can perform CRUD operations on recipients
- [ ] To mark an order as delivered, it is mandatory to send a photo
- [ ] Only the delivery person who picked up the order can mark it as delivered
- [ ] Only the administrator can change a user's password
- [ ] It must not be possible for a delivery person to list the orders of another delivery person
