interface UserProfile {
    key: string;
    permissions: string[];
  }
  

  export async function getMyProfile(token: string): Promise<UserProfile> { 
    const response = await fetch("https://account-api-dev.gasy.one/api/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  
    if (!response.ok) {
      throw new Error("Không thể lấy thông tin người dùng")
    }
    return response.json()
  }