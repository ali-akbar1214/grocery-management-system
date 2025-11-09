  Grocery Management System \* { margin: 0; padding: 0; box-sizing: border-box; } body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f7fa; color: #333; line-height: 1.6; } .container { max-width: 1280px; margin: 0 auto; padding: 20px; } /\* Header \*/ header { background: white; border-bottom: 1px solid #e1e5eb; padding: 15px 20px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); } .header-left h1 { font-size: 22px; font-weight: bold; color: #2c3e50; margin-bottom: 4px; } .header-left p { color: #7f8c8d; font-size: 14px; } .header-right { display: flex; gap: 15px; align-items: center; } .user-info { text-align: right; } .user-info p:first-child { font-weight: 600; color: #2c3e50; } .user-info p:last-child { color: #7f8c8d; font-size: 12px; } /\* Buttons \*/ button { padding: 10px 16px; border: none; border-radius: 6px; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; } .btn-primary { background-color: #3498db; color: white; } .btn-primary:hover { background-color: #2980b9; } .btn-success { background-color: #2ecc71; color: white; } .btn-success:hover { background-color: #27ae60; } .btn-danger { background-color: #e74c3c; color: white; } .btn-danger:hover { background-color: #c0392b; } .btn-secondary { background-color: #95a5a6; color: white; } .btn-secondary:hover { background-color: #7f8c8d; } .btn-outline { border: 1px solid #bdc3c7; background-color: white; color: #2c3e50; } .btn-outline:hover { background-color: #ecf0f1; } .btn-logout { background-color: #e74c3c; color: white; padding: 8px 12px; font-size: 12px; } .btn-edit { background-color: #f39c12; color: white; padding: 6px 10px; font-size: 12px; margin-right: 5px; } .btn-edit:hover { background-color: #d35400; } /\* Forms \*/ .form-group { margin-bottom: 16px; } label { display: block; margin-bottom: 6px; font-weight: 600; color: #2c3e50; font-size: 14px; } input, select, textarea { width: 100%; padding: 10px 12px; border: 1px solid #dce1e5; border-radius: 6px; font-size: 14px; font-family: inherit; } input:focus, select:focus, textarea:focus { outline: none; border-color: #3498db; box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2); } /\* Cards \*/ .card { background: white; border-radius: 8px; border: 1px solid #e1e5eb; padding: 20px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); } .card-header { font-size: 18px; font-weight: bold; margin-bottom: 16px; color: #2c3e50; padding-bottom: 10px; border-bottom: 1px solid #ecf0f1; } /\* Grid \*/ .grid { display: grid; gap: 20px; } .grid-2 { grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); } .grid-4 { grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); } /\* Stats \*/ .stat-card { background: white; border-radius: 8px; border: 1px solid #e1e5eb; padding: 20px; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.05); } .stat-label { color: #7f8c8d; font-size: 12px; font-weight: 600; text-transform: uppercase; margin-bottom: 8px; } .stat-value { font-size: 28px; font-weight: bold; color: #2c3e50; } .stat-card.blue .stat-value { color: #3498db; } .stat-card.green .stat-value { color: #2ecc71; } .stat-card.purple .stat-value { color: #9b59b6; } .stat-card.red .stat-value { color: #e74c3c; } /\* Tabs \*/ .tabs { display: flex; gap: 0; margin-bottom: 20px; border-bottom: 1px solid #e1e5eb; } .tab-button { padding: 12px 24px; background: transparent; border: none; border-bottom: 3px solid transparent; cursor: pointer; font-weight: 600; color: #7f8c8d; transition: all 0.3s ease; } .tab-button.active { color: #3498db; border-bottom-color: #3498db; } .tab-content { display: none; } .tab-content.active { display: block; } /\* Tables \*/ table { width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.05); } th { background-color: #f8f9fa; padding: 12px; text-align: left; font-weight: 600; color: #2c3e50; border-bottom: 1px solid #e1e5eb; } td { padding: 12px; border-bottom: 1px solid #ecf0f1; } tr:hover { background-color: #f8f9fa; } .low-stock { background-color: #ffeaa7 !important; } /\* Badges \*/ .badge { display: inline-block; padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: 600; } .badge-green { background-color: #d5f4e6; color: #27ae60; } .badge-red { background-color: #fadbd8; color: #c0392b; } .badge-blue { background-color: #d6eaf8; color: #2980b9; } .badge-yellow { background-color: #fef9e7; color: #f39c12; } /\* Modal \*/ .modal { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); z-index: 1000; justify-content: center; align-items: center; } .modal.active { display: flex; } .modal-content { background: white; border-radius: 8px; padding: 25px; max-width: 500px; width: 90%; max-height: 90vh; overflow-y: auto; box-shadow: 0 4px 12px rgba(0,0,0,0.15); } .modal-header { font-size: 18px; font-weight: bold; margin-bottom: 8px; color: #2c3e50; } .modal-description { color: #7f8c8d; margin-bottom: 20px; font-size: 14px; } .modal-close { position: absolute; top: 15px; right: 15px; background: none; border: none; font-size: 20px; cursor: pointer; color: #7f8c8d; } /\* Alert \*/ .alert { padding: 12px 16px; border-radius: 6px; margin-bottom: 20px; font-size: 14px; } .alert-red { background-color: #fadbd8; border: 1px solid #f5b7b1; color: #c0392b; } .alert-yellow { background-color: #fef9e7; border: 1px solid #f9e79f; color: #b7950b; } /\* Page Sections \*/ .page { display: none; } .page.active { display: block; } /\* Login Page - ENHANCED \*/ .login-container { display: flex; justify-content: center; align-items: center; min-height: 100vh; background: linear-gradient(135deg, #3498db 0%, #2c3e50 100%); padding: 20px; } .login-card { background: white; padding: 40px; border-radius: 16px; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15); max-width: 500px; width: 100%; position: relative; overflow: hidden; } .login-card::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 6px; background: linear-gradient(90deg, #3498db, #2ecc71, #e74c3c, #f39c12); } .login-card h1 { text-align: center; font-size: 32px; margin-bottom: 12px; color: #2c3e50; display: flex; align-items: center; justify-content: center; gap: 12px; } .login-card p { text-align: center; color: #7f8c8d; margin-bottom: 30px; font-size: 16px; } .role-buttons { display: flex; gap: 16px; margin-bottom: 30px; } .role-buttons button { flex: 1; padding: 18px; font-size: 16px; font-weight: 700; border-radius: 10px; transition: all 0.3s ease; box-shadow: 0 4px 8px rgba(0,0,0,0.1); } .role-buttons button:hover { transform: translateY(-3px); box-shadow: 0 6px 12px rgba(0,0,0,0.15); } .role-buttons .btn-primary { background: linear-gradient(135deg, #3498db 0%, #2980b9 100%); } .role-buttons .btn-secondary { background: linear-gradient(135deg, #95a5a6 0%, #7f8c8d 100%); } .form-divider { text-align: center; margin: 20px 0; color: #bdc3c7; font-size: 14px; position: relative; } .form-divider::before { content: ''; position: absolute; top: 50%; left: 0; width: 45%; height: 1px; background: #e1e5eb; } .form-divider::after { content: ''; position: absolute; top: 50%; right: 0; width: 45%; height: 1px; background: #e1e5eb; } .login-link { text-align: center; margin-top: 20px; color: #7f8c8d; } .login-link a { color: #3498db; cursor: pointer; text-decoration: none; font-weight: 600; } .login-link a:hover { text-decoration: underline; } .demo-accounts { text-align: center; margin-top: 20px; padding: 12px; background: #f8f9fa; border-radius: 8px; font-size: 13px; color: #7f8c8d; } /\* Product Item \*/ .product-item { background: #f8f9fa; border: 1px solid #e1e5eb; border-radius: 6px; padding: 12px; margin-bottom: 12px; } .product-item.low-stock { background-color: #ffeaa7; border-color: #fdcb6e; } .product-info { margin-bottom: 8px; } .product-name { font-weight: 600; color: #2c3e50; } .product-details { font-size: 12px; color: #7f8c8d; } .product-price { font-size: 16px; font-weight: bold; color: #27ae60; } .product-actions { display: flex; gap: 8px; margin-top: 8px; } .product-actions input { width: 60px; padding: 6px; font-size: 12px; } .product-actions button { flex: 1; padding: 6px 12px; font-size: 12px; } /\* Bill Items \*/ .bill-item { background: #f8f9fa; border: 1px solid #e1e5eb; border-radius: 6px; padding: 12px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center; } .bill-item-info { flex: 1; } .bill-item-name { font-weight: 600; color: #2c3e50; margin-bottom: 4px; } .bill-item-details { font-size: 12px; color: #7f8c8d; } .bill-item-remove { background: #fadbd8; border: none; color: #e74c3c; padding: 6px 10px; border-radius: 4px; cursor: pointer; font-weight: 600; } .bill-item-remove:hover { background: #f5b7b1; } /\* Scrollable Container \*/ .scrollable { max-height: 400px; overflow-y: auto; border: 1px solid #e1e5eb; border-radius: 6px; padding: 12px; } /\* Utility Classes \*/ .mb-16 { margin-bottom: 16px; } .mb-24 { margin-bottom: 24px; } .flex { display: flex; } .flex-col { flex-direction: column; } .gap-4 { gap: 16px; } .gap-6 { gap: 24px; } .text-center { text-align: center; } .w-full { width: 100%; } /\* Responsive \*/ @media (max-width: 768px) { .container { padding: 15px; } header { flex-direction: column; gap: 15px; } .header-left, .header-right { width: 100%; } .header-right { justify-content: space-between; } .grid-4 { grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); } .modal-content { padding: 20px; } .login-card { padding: 30px 20px; } .role-buttons { flex-direction: column; } }

# 🛒 Grocery Management System

Effective Solution for all small stores

Admin Employee

Email/Username 

Password 

Login Create New Account

Full Name 

Email 

Password 

Sign Up Back to Login

Employee Username 

Password 

Login

Demo Accounts: admin@gmail.com/123456 || aliakbar/12345678

# 📊 Admin Dashboard

Welcome back!

Admin

Administrator

Logout

Total Employees

3

Total Products

12

Total Sales (PKR)

₨12,450

Low Stock Items

2

Employee Management Inventory Management

Add New Employee

Employee Name 

Username 

Password 

Add Employee

Employee List

| Name | Username | Status | Actions |
| --- | --- | --- | --- |

⚠️ 2 item(s) below minimum stock: Milk, Eggs

Add New Product

Product Name 

SKU 

Barcode 

Price (PKR) 

Quantity 

Min Stock 

Category Grains Oils Flour Spices Dairy Fruits & Vegetables Beverages Snacks Other

Add Product

Product Inventory

| Product Name | SKU | Barcode | Price (PKR) | Quantity | Min Stock | Category | Status | Actions |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |

# Employee Billing System

Process customer bills here

Employee

Billing Operator

Logout

Barcode Scanner

Scan or Enter Barcode 

Scan

Bill Total

Total Amount

₨0

Search Products

Search Product Name 

Bill Items

No items added yet

Customer Name 

Payment Method Cash Card Mobile Payment

✓ Complete Bill Clear Bill

Bill History

| Bill ID | Customer | Items | Amount (PKR) | Payment | Time |
| --- | --- | --- | --- | --- | --- |

×

Edit Employee

Update employee information

Employee Name 

Username 

Password 

Save Changes Cancel

×

Edit Product

Update product information

Product Name 

SKU 

Barcode 

Price (PKR) 

Quantity 

Min Stock 

Category Grains Oils Flour Spices Dairy Fruits & Vegetables Beverages Snacks Other

Save Changes Cancel

// Global State let currentUser = null; let userRole = null; let billItems = \[\]; let editingEmployeeId = null; let editingProductId = null; // Initialize window.addEventListener('load', () => { loadAllData(); updateDashboard(); }); // ==================== DATA MANAGEMENT ==================== function loadAllData() { // Load or initialize data if (!localStorage.getItem('admins')) { localStorage.setItem('admins', JSON.stringify(\[ { id: '1', name: 'Admin User', email: 'admin@gmail.com', password: '123456' } \])); } if (!localStorage.getItem('employees')) { localStorage.setItem('employees', JSON.stringify(\[ { id: '1', name: 'Ali Akbar', username: 'aliakbar', password: '12345678' }, { id: '2', name: 'Sunaina', username: 'sunaina', password: '12345678' }, { id: '3', name: 'Hasan Zahid', username: 'hasanzahid', password: '12345678' } \])); } if (!localStorage.getItem('products')) { localStorage.setItem('products', JSON.stringify(\[ { id: '1', name: 'Rice (5kg)', sku: 'I1', barcode: '0001', price: 500, quantity: 5, minStock: 10, category: 'Grains' }, { id: '2', name: 'Oil (1L)', sku: 'I2', barcode: '0002', price: 750, quantity: 20, minStock: 15, category: 'Oils' }, { id: '3', name: 'Flour (1kg)', sku: 'I3', barcode: '0003', price: 300, quantity: 30, minStock: 10, category: 'Flour' }, { id: '4', name: 'Milk (1L)', sku: 'I4', barcode: '0004', price: 250, quantity: 80, minStock: 15, category: 'Dairy' }, { id: '5', name: 'Eggs (Dozen)', sku: 'I5', barcode: '0005', price: 350, quantity: 120, minStock: 12, category: 'Dairy' }, { id: '6', name: 'Sugar (1kg)', sku: 'I6', barcode: '0006', price: 200, quantity: 25, minStock: 10, category: 'Other' }, \])); } } function getProducts() { return JSON.parse(localStorage.getItem('products') || '\[\]'); } function saveProducts(products) { localStorage.setItem('products', JSON.stringify(products)); updateDashboard(); } function getEmployees() { return JSON.parse(localStorage.getItem('employees') || '\[\]'); } function saveEmployees(employees) { localStorage.setItem('employees', JSON.stringify(employees)); } function getAdmins() { return JSON.parse(localStorage.getItem('admins') || '\[\]'); } function saveAdmins(admins) { localStorage.setItem('admins', JSON.stringify(admins)); } function getBills() { return JSON.parse(localStorage.getItem('bills') || '\[\]'); } function saveBills(bills) { localStorage.setItem('bills', JSON.stringify(bills)); updateDashboard(); } // ==================== AUTHENTICATION ==================== function showAdminLogin() { document.getElementById('adminLoginForm').style.display = 'block'; document.getElementById('adminSignupForm').style.display = 'none'; document.getElementById('employeeLoginForm').style.display = 'none'; } function showAdminSignup() { document.getElementById('adminLoginForm').style.display = 'none'; document.getElementById('adminSignupForm').style.display = 'block'; document.getElementById('employeeLoginForm').style.display = 'none'; } function showEmployeeLogin() { document.getElementById('adminLoginForm').style.display = 'none'; document.getElementById('adminSignupForm').style.display = 'none'; document.getElementById('employeeLoginForm').style.display = 'block'; } function loginAdmin() { const email = document.getElementById('adminEmail').value; const password = document.getElementById('adminPassword').value; if (!email || !password) { alert('Please fill all fields'); return; } const admins = getAdmins(); const admin = admins.find(a => (a.email === email || a.name === email) && a.password === password); if (admin) { currentUser = admin; userRole = 'admin'; switchPage('adminPage'); document.getElementById('adminNameDisplay').textContent = admin.name; document.getElementById('adminGreeting').textContent = \`Welcome back, ${admin.name}!\`; loadEmployeeTable(); loadProductTable(); updateDashboard(); } else { alert('Invalid credentials'); } } function signupAdmin() { const name = document.getElementById('signupName').value; const email = document.getElementById('signupEmail').value; const password = document.getElementById('signupPassword').value; if (!name || !email || !password) { alert('Please fill all fields'); return; } const admins = getAdmins(); if (admins.find(a => a.email === email)) { alert('Email already exists'); return; } admins.push({ id: String(admins.length + 1), name, email, password }); saveAdmins(admins); alert('Account created! Please log in.'); showAdminLogin(); } function loginEmployee() { const username = document.getElementById('employeeUsername').value; const password = document.getElementById('employeePassword').value; if (!username || !password) { alert('Please fill all fields'); return; } const employees = getEmployees(); const employee = employees.find(e => e.username === username && e.password === password); if (employee) { currentUser = employee; userRole = 'employee'; switchPage('employeePage'); document.getElementById('empNameDisplay').textContent = employee.name; document.getElementById('empGreeting').textContent = \`Welcome, ${employee.name}!\`; loadProductsList(); loadBillHistory(); billItems = \[\]; updateBillDisplay(); } else { alert('Invalid credentials'); } } function logout() { currentUser = null; userRole = null; billItems = \[\]; switchPage('loginPage'); document.getElementById('adminEmail').value = ''; document.getElementById('adminPassword').value = ''; document.getElementById('employeeUsername').value = ''; document.getElementById('employeePassword').value = ''; } // ==================== PAGE MANAGEMENT ==================== function switchPage(pageName) { document.querySelectorAll('.page').forEach(page => page.classList.remove('active')); document.getElementById(pageName).classList.add('active'); } function switchTab(tabName) { document.querySelectorAll('.tab-content').forEach(tab => tab.style.display = 'none'); document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active')); document.getElementById(tabName).style.display = 'block'; event.target.classList.add('active'); } // ==================== EMPLOYEE MANAGEMENT ==================== function addEmployee() { const name = document.getElementById('empName').value; const username = document.getElementById('empUsername').value; const password = document.getElementById('empPassword').value; if (!name || !username || !password) { alert('Please fill all fields'); return; } const employees = getEmployees(); if (employees.find(e => e.username === username)) { alert('Username already exists'); return; } employees.push({ id: String(employees.length + 1), name, username, password }); saveEmployees(employees); loadEmployeeTable(); document.getElementById('empName').value = ''; document.getElementById('empUsername').value = ''; document.getElementById('empPassword').value = ''; alert('Employee added successfully!'); } function loadEmployeeTable() { const employees = getEmployees(); const tbody = document.getElementById('employeeTableBody'); tbody.innerHTML = employees.map(emp => \` <tr> <td>${emp.name}</td> <td>${emp.username}</td> <td><span class="badge badge-green">Active</span></td> <td> <button class="btn-edit" onclick="editEmployee('${emp.id}')">Edit</button> <button class="btn-danger" style="padding: 6px 10px; font-size: 12px;" onclick="deleteEmployee('${emp.id}')">Delete</button> </td> </tr> \`).join(''); } function editEmployee(id) { const employees = getEmployees(); const employee = employees.find(e => e.id === id); if (employee) { editingEmployeeId = id; document.getElementById('editEmpName').value = employee.name; document.getElementById('editEmpUsername').value = employee.username; document.getElementById('editEmpPassword').value = employee.password; document.getElementById('editEmployeeModal').classList.add('active'); } } function saveEmployeeChanges() { if (!editingEmployeeId) return; const name = document.getElementById('editEmpName').value; const username = document.getElementById('editEmpUsername').value; const password = document.getElementById('editEmpPassword').value; if (!name || !username || !password) { alert('Please fill all fields'); return; } const employees = getEmployees(); const employeeIndex = employees.findIndex(e => e.id === editingEmployeeId); if (employeeIndex !== -1) { employees\[employeeIndex\].name = name; employees\[employeeIndex\].username = username; employees\[employeeIndex\].password = password; saveEmployees(employees); loadEmployeeTable(); closeEditEmployeeModal(); alert('Employee updated successfully!'); } } function closeEditEmployeeModal() { document.getElementById('editEmployeeModal').classList.remove('active'); editingEmployeeId = null; } function deleteEmployee(id) { if (confirm('Are you sure you want to delete this employee?')) { const employees = getEmployees(); const filtered = employees.filter(e => e.id !== id); saveEmployees(filtered); loadEmployeeTable(); alert('Employee deleted successfully!'); } } // ==================== INVENTORY MANAGEMENT ==================== function addProduct() { const name = document.getElementById('prodName').value; const sku = document.getElementById('prodSKU').value; const barcode = document.getElementById('prodBarcode').value; const price = parseFloat(document.getElementById('prodPrice').value); const quantity = parseInt(document.getElementById('prodQuantity').value); const minStock = parseInt(document.getElementById('prodMinStock').value); const category = document.getElementById('prodCategory').value; if (!name || !sku || !barcode || !price || !quantity) { alert('Please fill all required fields'); return; } const products = getProducts(); if (products.find(p => p.sku === sku || p.barcode === barcode)) { alert('Barcode already exists'); return; } products.push({ id: String(products.length + 1), name, sku, barcode, price, quantity, minStock, category }); saveProducts(products); loadProductTable(); loadProductsList(); document.getElementById('prodName').value = ''; document.getElementById('prodSKU').value = ''; document.getElementById('prodBarcode').value = ''; document.getElementById('prodPrice').value = ''; document.getElementById('prodQuantity').value = ''; document.getElementById('prodMinStock').value = ''; document.getElementById('prodCategory').value = 'Other'; alert('Product added successfully!'); } function loadProductTable() { const products = getProducts(); const tbody = document.getElementById('productTableBody'); tbody.innerHTML = products.map(prod => { const isLowStock = prod.quantity <= prod.minStock; return \` <tr class="${isLowStock ? 'low-stock' : ''}"> <td>${prod.name}</td> <td>${prod.sku}</td> <td>${prod.barcode}</td> <td>₨${prod.price.toLocaleString()}</td> <td>${prod.quantity}</td> <td>${prod.minStock}</td> <td>${prod.category}</td> <td> <span class="badge ${isLowStock ? 'badge-yellow' : 'badge-green'}"> ${isLowStock ? 'Low Stock' : 'In Stock'} </span> </td> <td> <button class="btn-edit" onclick="editProduct('${prod.id}')">Edit</button> <button onclick="updateQty('${prod.id}', -1)" style="padding: 6px 8px; margin-right: 4px;">-</button> <button onclick="updateQty('${prod.id}', 1)" style="padding: 6px 8px;">+</button> </td> </tr> \`; }).join(''); } function editProduct(id) { const products = getProducts(); const product = products.find(p => p.id === id); if (product) { editingProductId = id; document.getElementById('editProdName').value = product.name; document.getElementById('editProdSKU').value = product.sku; document.getElementById('editProdBarcode').value = product.barcode; document.getElementById('editProdPrice').value = product.price; document.getElementById('editProdQuantity').value = product.quantity; document.getElementById('editProdMinStock').value = product.minStock; document.getElementById('editProdCategory').value = product.category; document.getElementById('editProductModal').classList.add('active'); } } function saveProductChanges() { if (!editingProductId) return; const name = document.getElementById('editProdName').value; const sku = document.getElementById('editProdSKU').value; const barcode = document.getElementById('editProdBarcode').value; const price = parseFloat(document.getElementById('editProdPrice').value); const quantity = parseInt(document.getElementById('editProdQuantity').value); const minStock = parseInt(document.getElementById('editProdMinStock').value); const category = document.getElementById('editProdCategory').value; if (!name || !sku || !barcode || !price || !quantity) { alert('Please fill all required fields'); return; } const products = getProducts(); const productIndex = products.findIndex(p => p.id === editingProductId); if (productIndex !== -1) { products\[productIndex\].name = name; products\[productIndex\].sku = sku; products\[productIndex\].barcode = barcode; products\[productIndex\].price = price; products\[productIndex\].quantity = quantity; products\[productIndex\].minStock = minStock; products\[productIndex\].category = category; saveProducts(products); loadProductTable(); loadProductsList(); closeEditProductModal(); alert('Product updated successfully!'); } } function closeEditProductModal() { document.getElementById('editProductModal').classList.remove('active'); editingProductId = null; } function updateQty(id, change) { const products = getProducts(); const product = products.find(p => p.id === id); if (product) { product.quantity = Math.max(0, product.quantity + change); saveProducts(products); loadProductTable(); updateDashboard(); } } // ==================== EMPLOYEE BILLING ==================== function loadProductsList() { const products = getProducts(); const search = document.getElementById('productSearch').value.toLowerCase(); const filtered = products.filter(p => p.name.toLowerCase().includes(search)); const container = document.getElementById('productsList'); container.innerHTML = filtered.map(prod => \` <div class="product-item ${prod.quantity <= 0 ? 'low-stock' : ''}"> <div class="product-info"> <div class="product-name">${prod.name}</div> <div class="product-details">Barcode: ${prod.barcode} | Stock: ${prod.quantity}</div> <div class="product-price">₨${prod.price.toLocaleString()}</div> </div> <div class="product-actions"> <input type="number" value="1" id="qty\_${prod.id}" min="1" max="${prod.quantity}"> <button class="btn-success" onclick="addToCart('${prod.id}')" ${prod.quantity <= 0 ? 'disabled' : ''}>Add</button> </div> </div> \`).join(''); } function addToCart(productId) { const products = getProducts(); const product = products.find(p => p.id === productId); if (!product) return; const qtyInput = document.getElementById(\`qty\_${productId}\`); const qty = parseInt(qtyInput.value) || 1; if (qty > product.quantity) { alert('Insufficient stock'); return; } const existing = billItems.find(item => item.productId === productId); if (existing) { existing.quantity += qty; existing.total = existing.price \* existing.quantity; } else { billItems.push({ productId, name: product.name, price: product.price, quantity: qty, total: product.price \* qty }); } updateBillDisplay(); qtyInput.value = '1'; } function scanBarcode() { const barcode = document.getElementById('barcodeInput').value.trim(); if (!barcode) { alert('Please enter a barcode'); return; } const products = getProducts(); const product = products.find(p => p.barcode === barcode); if (product) { addToCart(product.id); } else { alert('Product not found'); } document.getElementById('barcodeInput').value = ''; document.getElementById('barcodeInput').focus(); } function removeFromCart(productId) { billItems = billItems.filter(item => item.productId !== productId); updateBillDisplay(); } function updateBillDisplay() { const total = billItems.reduce((sum, item) => sum + item.total, 0); document.getElementById('billTotalDisplay').textContent = \`₨${total.toLocaleString()}\`; const container = document.getElementById('billItemsList'); if (billItems.length === 0) { container.innerHTML = '<p style="text-align: center; color: #7f8c8d;">No items added yet</p>'; } else { container.innerHTML = billItems.map(item => \` <div class="bill-item"> <div class="bill-item-info"> <div class="bill-item-name">${item.name}</div> <div class="bill-item-details">${item.quantity} × ₨${item.price.toLocaleString()} = ₨${item.total.toLocaleString()}</div> </div> <button class="bill-item-remove" onclick="removeFromCart('${item.productId}')">✕</button> </div> \`).join(''); } } function completeBill() { const customerName = document.getElementById('customerName').value; const paymentMethod = document.getElementById('paymentMethod').value; if (billItems.length === 0) { alert('Add items to bill first'); return; } if (!customerName) { alert('Enter customer name'); return; } // Update inventory const products = getProducts(); billItems.forEach(billItem => { const product = products.find(p => p.id === billItem.productId); if (product) { product.quantity -= billItem.quantity; } }); saveProducts(products); // Save bill const bills = getBills(); const total = billItems.reduce((sum, item) => sum + item.total, 0); bills.push({ id: String(bills.length + 1), date: new Date().toLocaleString(), items: billItems, total, customerName, paymentMethod }); saveBills(bills); loadProductsList(); loadBillHistory(); clearBill(); alert('Bill completed successfully!'); } function clearBill() { billItems = \[\]; document.getElementById('customerName').value = ''; document.getElementById('paymentMethod').value = 'Cash'; updateBillDisplay(); loadProductsList(); } function loadBillHistory() { const bills = getBills(); const tbody = document.getElementById('billHistoryBody'); if (bills.length === 0) { tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: #7f8c8d;">No bills yet</td></tr>'; return; } tbody.innerHTML = bills.map(bill => \` <tr> <td>#${bill.id}</td> <td>${bill.customerName}</td> <td>${bill.items.length} items</td> <td style="font-weight: bold; color: #27ae60;">₨${bill.total.toLocaleString()}</td> <td><span class="badge badge-blue">${bill.paymentMethod}</span></td> <td style="font-size: 12px; color: #7f8c8d;">${bill.date}</td> </tr> \`).join(''); } // ==================== DASHBOARD UPDATES ==================== function updateDashboard() { if (userRole !== 'admin') return; const products = getProducts(); const bills = getBills(); const lowStockItems = products.filter(p => p.quantity <= p.minStock); const totalSales = bills.reduce((sum, bill) => sum + bill.total, 0); document.getElementById('totalEmployees').textContent = getEmployees().length; document.getElementById('totalProducts').textContent = products.length; document.getElementById('totalSales').textContent = \`₨${totalSales.toLocaleString()}\`; document.getElementById('lowStockCount').textContent = lowStockItems.length; if (lowStockItems.length > 0) { document.getElementById('lowStockAlert').style.display = 'block'; document.getElementById('lowStockMessage').textContent = \`${lowStockItems.length} item(s) below minimum stock: ${lowStockItems.map(p => p.name).join(', ')}\`; } else { document.getElementById('lowStockAlert').style.display = 'none'; } loadProductTable(); } // Event Listeners document.getElementById('productSearch').addEventListener('input', loadProductsList); document.getElementById('barcodeInput').addEventListener('keypress', (e) => { if (e.key === 'Enter') scanBarcode(); }); // Auto-update dashboard every second setInterval(() => { if (userRole === 'admin') { updateDashboard(); } }, 1000);
