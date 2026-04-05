import React, { useState, useEffect } from 'react';
import { X, Package, ShieldCheck } from 'lucide-react';
import './AuthModal.css';

const OrdersModal = ({ isOpen, onClose, token, user }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen && token) {
      fetchOrders();
    }
  }, [isOpen, token]);

  if (!isOpen) return null;

  const fetchOrders = async () => {
    setLoading(true);
    const endpoint = user?.role === 'admin' ? '/api/v1/orders' : '/api/v1/orders/myorders';
    
    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setOrders(data.data);
      } else {
        setError(data.message || 'Failed to fetch orders');
      }
    } catch (err) {
      setError('Server error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container orders-container" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><X size={24} /></button>
        <h2 className="modal-title">
          {user?.role === 'admin' ? <><ShieldCheck size={28} color="#C59B27"/> Admin Dashboard</> : 'My Orders'}
        </h2>
        
        {loading ? (
          <div className="modal-loading" style={{textAlign: 'center', padding: '2rem'}}>Loading orders...</div>
        ) : error ? (
          <div className="modal-error">{error}</div>
        ) : orders.length === 0 ? (
          <div className="empty-cart" style={{padding: '2rem', textAlign: 'center'}}>
            <Package size={50} style={{margin: '0 auto 10px', opacity: 0.3}} />
            <p>No orders found yet.</p>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map(order => (
              <div key={order._id} className="order-item">
                <div className="order-header">
                  <strong>ID: #{order._id.substring(order._id.length - 6)}</strong>
                  <span className={`order-status ${order.isDelivered ? 'delivered' : 'pending'}`}>
                    {order.isDelivered ? 'Delivered' : 'Processing'}
                  </span>
                </div>
                <div className="order-body">
                  <p><strong>Total:</strong> ₹{order.totalPrice}</p>
                  <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                  {user?.role === 'admin' && order.user && (
                    <p style={{color: '#E05A7E'}}><strong>Customer:</strong> {order.user.name} ({order.user.email})</p>
                  )}
                  <p style={{marginTop: '10px'}}><strong>Items:</strong> {order.orderItems.map(i => `${i.qty}x ${i.name}`).join(', ')}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersModal;
