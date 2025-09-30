export default function UnauthorizedPage() {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        textAlign: 'center' 
      }}>
        <h1>Truy cập bị từ chối</h1>
        <p>Bạn không có quyền truy cập vào ứng dụng này.</p>
        <p>Vui lòng liên hệ quản trị viên để được cấp quyền.</p>
      </div>
    )
  }