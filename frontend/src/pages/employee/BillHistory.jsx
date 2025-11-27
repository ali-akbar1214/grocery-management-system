import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    Receipt,
    Calendar,
    Eye,
    X,
    AlertCircle,
    FileText,
    User,
    Printer,
    Download
} from 'lucide-react';

const BillHistory = () => {
    const [bills, setBills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedBill, setSelectedBill] = useState(null);

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const token = userInfo?.token;
    const employeeId = userInfo?._id;

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };

    useEffect(() => {
        if (employeeId) {
            fetchEmployeeBills();
        }
    }, [employeeId]);

    const fetchEmployeeBills = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/api/sales/employee/${employeeId}/bills`, config);
            setBills(data);
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch bill history');
            setLoading(false);
        }
    };

    const handleViewBill = (bill) => {
        setSelectedBill(bill);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedBill(null);
    };

    const handlePrintBill = () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Bill - ${selectedBill._id.slice(-8)}</title>
                    <style>
                        body { 
                            font-family: 'Courier New', monospace; 
                            padding: 40px;
                            max-width: 800px;
                            margin: 0 auto;
                        }
                        @media print {
                            body { padding: 20px; }
                        }
                    </style>
                </head>
                <body>
                    ${selectedBill.billData}
                    <script>
                        window.onload = function() {
                            window.print();
                            window.onafterprint = function() {
                                window.close();
                            }
                        }
                    </script>
                </body>
            </html>
        `);
        printWindow.document.close();
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p className="loading-text">Loading bill history...</p>
            </div>
        );
    }

    const totalRevenue = bills.reduce((sum, bill) => sum + bill.sale.total, 0);
    const totalBills = bills.length;

    return (
        <div>
            {/* Page Header */}
            <div className="page-header">
                <h1 className="page-title">
                    <Receipt size={32} className="inline mr-3" />
                    <span className="text-gradient">Bill</span> History
                </h1>
                <p className="page-description">
                    View all your transaction records and receipts
                </p>
            </div>

            {/* Summary Stats */}
            {bills.length > 0 && (
                <div className="stats-grid" style={{marginBottom: 'var(--spacing-2xl)'}}>
                    <div className="stat-card">
                        <div className="stat-icon bg-blue-100">
                            <Receipt size={24} className="text-blue-600" />
                        </div>
                        <div className="stat-content">
                            <p className="stat-label">Total Bills</p>
                            <p className="stat-value">{totalBills}</p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon bg-green-100">
                            <FileText size={24} className="text-green-600" />
                        </div>
                        <div className="stat-content">
                            <p className="stat-label">Total Revenue</p>
                            <p className="stat-value">PKR {totalRevenue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Error Alert */}
            {error && (
                <div className="alert alert-error">
                    <AlertCircle className="alert-icon" size={20} />
                    <div className="alert-content">
                        <p className="alert-message">{error}</p>
                    </div>
                </div>
            )}

            {/* No Bills State */}
            {bills.length === 0 ? (
                <div className="card">
                    <div className="empty-state">
                        <Receipt className="empty-state-icon" size={60} />
                        <h3 className="empty-state-title">No Bills Found</h3>
                        <p className="empty-state-description">
                            You haven't processed any sales yet. Start selling to see your bill history here!
                        </p>
                    </div>
                </div>
            ) : (
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Transaction History</h3>
                        <p className="card-subtitle">All your sales receipts and bills</p>
                    </div>
                    <div className="card-body">
                        <div className="table-container">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Bill ID</th>
                                        <th>Sale ID</th>
                                        <th>Date</th>
                                        <th style={{textAlign: 'right'}}>Total</th>
                                        <th style={{textAlign: 'center'}}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bills.map((bill) => (
                                        <tr key={bill._id}>
                                            <td>
                                                <div className="flex items-center">
                                                    <Receipt size={16} className="mr-2 text-gray-400" />
                                                    <span className="badge badge-primary">
                                                        #{bill._id.slice(-6)}
                                                    </span>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="badge badge-info">
                                                    {bill.sale.saleId || bill.sale._id.slice(-6)}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="flex items-center text-gray-600">
                                                    <Calendar size={14} className="mr-1" />
                                                    {new Date(bill.sale.createdAt).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}
                                                </div>
                                            </td>
                                            <td style={{textAlign: 'right'}}>
                                                <span className="font-semibold text-green-600">
                                                    PKR {bill.sale.total.toFixed(2)}
                                                </span>
                                            </td>
                                            <td style={{textAlign: 'center'}}>
                                                <button
                                                    onClick={() => handleViewBill(bill)}
                                                    className="btn btn-sm"
                                                >
                                                    <Eye size={14} />
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* Bill Details Modal - SEXY AF */}
            {modalOpen && selectedBill && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div 
                        className="modal" 
                        onClick={(e) => e.stopPropagation()} 
                        style={{
                            maxWidth: '900px',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            padding: '2px',
                            borderRadius: '20px'
                        }}
                    >
                        <div style={{
                            background: 'white',
                            borderRadius: '18px',
                            overflow: 'hidden'
                        }}>
                            {/* Gradient Header */}
                            <div style={{
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                padding: '2rem',
                                color: 'white'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                                        <div style={{
                                            background: 'rgba(255, 255, 255, 0.2)',
                                            padding: '0.75rem',
                                            borderRadius: '12px',
                                            backdropFilter: 'blur(10px)'
                                        }}>
                                            <Receipt size={32} />
                                        </div>
                                        <div>
                                            <h3 style={{
                                                fontSize: '1.75rem',
                                                fontWeight: 'bold',
                                                margin: 0,
                                                textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                            }}>
                                                Bill Receipt
                                            </h3>
                                            <p style={{
                                                margin: '0.25rem 0 0 0',
                                                opacity: 0.9,
                                                fontSize: '0.95rem'
                                            }}>
                                                Transaction #{selectedBill._id.slice(-8).toUpperCase()}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleCloseModal}
                                        style={{
                                            background: 'rgba(255, 255, 255, 0.2)',
                                            border: 'none',
                                            color: 'white',
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '10px',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backdropFilter: 'blur(10px)',
                                            transition: 'all 0.2s'
                                        }}
                                        onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'}
                                        onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
                                    >
                                        <X size={24} />
                                    </button>
                                </div>

                                {/* Customer Info */}
                                {selectedBill.customerInfo && (
                                    <div style={{
                                        marginTop: '1.5rem',
                                        padding: '1rem',
                                        background: 'rgba(255, 255, 255, 0.15)',
                                        borderRadius: '10px',
                                        backdropFilter: 'blur(10px)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem'
                                    }}>
                                        <User size={20} />
                                        <div>
                                            <div style={{fontSize: '0.8rem', opacity: 0.8}}>Customer</div>
                                            <div style={{fontWeight: 600, fontSize: '1.1rem'}}>{selectedBill.customerInfo}</div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Bill Content - Beautiful Receipt Paper */}
                            <div style={{padding: '2rem'}}>
                                <div style={{
                                    background: 'linear-gradient(to bottom, #bab6b6ff 0%, #606161ff 100%)',
                                    border: '2px solid #e2e8f0',
                                    borderRadius: '12px',
                                    padding: '2.5rem',
                                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
                                    position: 'relative',
                                    maxHeight: '60vh',
                                    overflowY: 'auto',
                                    fontFamily: "'Courier New', monospace"
                                }}>
                                    {/* Decorative Receipt Holes */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '20px',
                                        left: '0',
                                        right: '0',
                                        display: 'flex',
                                        justifyContent: 'space-around',
                                        padding: '0 2rem'
                                    }}>
                                        {[...Array(8)].map((_, i) => (
                                            <div key={i} style={{
                                                width: '12px',
                                                height: '12px',
                                                borderRadius: '50%',
                                                background: '#e2e8f0',
                                                boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)'
                                            }} />
                                        ))}
                                    </div>

                                    {/* Bill Content */}
                                    <div 
                                        dangerouslySetInnerHTML={{ 
                                            __html: selectedBill.billData
                                                .replace(/<button[^>]*>.*?<\/button>/gi, '')
                                                .replace(/class="bill-action[^"]*"/gi, '')
                                        }}
                                        style={{
                                            marginTop: '2rem',
                                            fontSize: '0.95rem',
                                            lineHeight: '1.8',
                                            color: '#090909ff'
                                        }}
                                    />

                                    {/* Thank You Message */}
                                    <div style={{
                                        marginTop: '2rem',
                                        paddingTop: '1.5rem',
                                        borderTop: '2px dashed #070707ff',
                                        textAlign: 'center',
                                        color: '#f8f4f4ff',
                                        fontStyle: 'italic'
                                    }}>
                                        Thank you for your business! 🙏
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div style={{
                                padding: '1.5rem 2rem 2rem 2rem',
                                display: 'flex',
                                gap: '1rem',
                                justifyContent: 'flex-end',
                                borderTop: '1px solid #e2e8f0'
                            }}>
                                <button
                                    onClick={handlePrintBill}
                                    className="btn btn-primary"
                                >
                                    <Printer size={18} />
                                    Print Bill
                                </button>
                                <button
                                    onClick={handleCloseModal}
                                    className="btn btn-secondary"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BillHistory;