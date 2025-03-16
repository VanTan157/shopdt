import Link from "next/link";

const AdminHeader = () => {
  return (
    <header className="admin-header">
      <nav className="admin-header__nav">
        <ul className="pl-3 flex gap-4 py-4 bg-gray-500 text-white">
          <li>
            <Link href="/admin">Dashboard</Link>
          </li>
          <li>
            <Link href="/admin/users">User</Link>
          </li>
          <li>
            <Link href="/admin/products">Products</Link>
          </li>
          <li>
            <Link href="/admin/orders">Orders</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AdminHeader;
