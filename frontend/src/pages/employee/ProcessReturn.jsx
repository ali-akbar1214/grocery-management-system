import React, { useState } from 'react';
import axios from 'axios';
import { 
    RotateCcw,
    AlertCircle,
    CheckCircle,
    Receipt,
    Package,
    Hash
} from 'lucide-react';

const ProcessReturn = () => {
    const [saleId, setSaleId] = useState('');
    const [productId, setProductId] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const token = userInfo?.token;

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };

    const handleSubmitReturn = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!saleId || !productId || quantity <= 0) {
            setError('Please provide Sale ID, Product ID, and a valid quantity.');
            return;
        }

        try {
            setLoading(true);
            const returnItems = [{ product: productId, quantity: quantity }];
            await axios.post('/api/sales/return', { saleId, returnItems }, config);
            setSuccess('Return processed successfully!');
            setSaleId('');
            setProductId('');
            setQuantity(0);
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to process return');
            setLoading(false);
        }
    };

    return (
        <div>
            {/* Page Header */}
            <div className="page-header">
                <h1 className="page-title">
                    <span className="text-gradient">Process</span> Return
                </h1>
                <p className="page-description">
                    Handle product returns and restore inventory
                </p>
            </div>

            {/* Error Alert */}
            {error && (
                <div className="alert alert-error" style={{marginBottom: 'var(--spacing-xl)'}}>
                    <AlertCircle className="alert-icon" size={20} />
                    <div className="alert-content">
                        <p className="alert-message">{error}</p>
                    </div>
                </div>
            )}

            {/* Success Alert */}
            {success && (
                <div className="alert alert-success" style={{marginBottom: 'var(--spacing-xl)'}}>
                    <CheckCircle className="alert-icon" size={20} />
                    <div className="alert-content">
                        <p className="alert-message">{success}</p>
                    </div>
                </div>
            )}

            {/* Return Form Card */}
            <div className="card" style={{maxWidth: '800px', margin: '0 auto'}}>
                <div className="card-header">
                    <div style={{display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)'}}>
                        <RotateCcw size={24} style={{color: 'var(--warning)'}} />
                        <div>
                            <h3 className="card-title">Return Details</h3>
                            <p className="card-subtitle">Enter the information for the return transaction</p>
                        </div>
                    </div>
                </div>
                <form onSubmit={handleSubmitReturn}>
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="saleId" className="form-label">
                                <Receipt size={16} style={{display: 'inline', marginRight: '0.5rem'}} />
                                Sale ID
                            </label>
                            <input
                                type="text"
                                name="saleId"
                                id="saleId"
                                required
                                className="form-input"
                                placeholder="Enter the original sale ID"
                                value={saleId}
                                onChange={(e) => setSaleId(e.target.value)}
                            />
                            <p className="form-help">
                                The ID of the original sale transaction
                            </p>
                        </div>

                        <div className="form-group">
                            <label htmlFor="productId" className="form-label">
                                <Package size={16} style={{display: 'inline', marginRight: '0.5rem'}} />
                                Product ID
                            </label>
                            <input
                                type="text"
                                name="productId"
                                id="productId"
                                required
                                className="form-input"
                                placeholder="Enter the product ID to return"
                                value={productId}
                                onChange={(e) => setProductId(e.target.value)}
                            />
                            <p className="form-help">
                                The specific product being returned
                            </p>
                        </div>

                        <div className="form-group">
                            <label htmlFor="quantity" className="form-label">
                                <Hash size={16} style={{display: 'inline', marginRight: '0.5rem'}} />
                                Quantity to Return
                            </label>
                            <input
                                type="number"
                                name="quantity"
                                id="quantity"
                                required
                                min="1"
                                className="form-input"
                                placeholder="Enter quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                            />
                            <p className="form-help">
                                Number of units being returned
                            </p>
                        </div>

                        <div style={{
                            padding: 'var(--spacing-lg)',
                            background: 'rgba(245, 158, 11, 0.1)',
                            border: '1px solid rgba(245, 158, 11, 0.3)',
                            borderRadius: 'var(--radius-md)',
                            marginTop: 'var(--spacing-lg)'
                        }}>
                            <div style={{display: 'flex', gap: 'var(--spacing-sm)', alignItems: 'flex-start'}}>
                                <AlertCircle size={20} style={{color: 'var(--warning)', flexShrink: 0, marginTop: '2px'}} />
                                <div>
                                    <div style={{fontWeight: 600, color: 'var(--text)', marginBottom: '0.25rem'}}>
                                        Important Information
                                    </div>
                                    <div style={{fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5}}>
                                        Processing a return will restore the returned quantity to inventory and adjust the sale record. Make sure all information is correct before submitting.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary w-full"
                        >
                            <RotateCcw size={18} />
                            {loading ? 'Processing Return...' : 'Process Return'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProcessReturn;