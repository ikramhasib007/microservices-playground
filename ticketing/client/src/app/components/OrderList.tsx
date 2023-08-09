"use client"


const statuses = {
  "complete": 'text-green-700 bg-green-50 ring-green-600/20',
  "awaiting:payment": 'text-gray-600 bg-gray-50 ring-gray-500/10',
  "created": 'text-yellow-800 bg-yellow-50 ring-yellow-600/20',
  "cancelled": 'text-red-800 bg-red-50 ring-red-600/20',
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

type OrderListProps = {
  orders: Order[]
}

const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  return (
    <ul role="list" className="divide-y divide-gray-100">
      {orders.map((order) => (
        <li key={order.id} className="flex items-center justify-between gap-x-6 py-5">
          <div className="min-w-0">
            <div className="flex items-start gap-x-3">
              <p className="text-sm font-semibold leading-6 text-gray-900">{order.ticket.title}</p>
              <p
                className={classNames(
                  statuses[order.status],
                  'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset'
                )}
              >
                {order.status}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default OrderList
