import axios from "axios";

export const checkAuth = async ({setIsAuthenticated, setIsLoading, navigate}) => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      setIsAuthenticated(false);
      setIsLoading(false);
      return;
    }

    try {
      await axios.get("http://localhost:4445/api/home/auth-verify", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsAuthenticated(true);
      setIsLoading(false);
    } catch (err) {
      if (
        err.response?.status === 401 &&
        err.response.data.message === "Token is not valid"
      ) {
        try {
          // 2. Attempt token refresh:
          const refreshResponse = await axios.post("http://localhost:4445/api/home/token-refresh", {
            refreshToken: localStorage.getItem("refreshToken"), // Get refresh token
          });

          const newToken = refreshResponse.data.token;
          const newRefreshToken = refreshResponse.data.refreshToken;

          sessionStorage.setItem("token", newToken);
          sessionStorage.setItem("refreshToken", newRefreshToken);

          setIsAuthenticated(true);
          setIsLoading(false);
        } catch (error) {
          console.error("Token refresh failed:", refreshError);
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("refreshToken");
          setIsAuthenticated(false);
          setIsLoading(false);
          navigate("/l", { state: { from: location }, replace: true }); // Redirect to login, preserving original path
        }
      } else{
        console.error("Token verification error:", verifyError);
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          setIsAuthenticated(false);
          setIsLoading(false);
          navigate('/', { state: { from: location }, replace: true });
      }
    }
  };


  export const fetchUserProfile = async (setUser) => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      console.error("No token found. User not logged in");
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:4445/api/home/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`, //send token in the Authorization header.
          },
        }
      );

      setUser(response.data.user);
    } catch (error) {
    //   setError(error.response?.data?.message || `Error fetching profile`);
      console.error("Profile fetch error: ", error);
    } finally {
    //   setLoading(false);
    }
  };

  // =====================* postUpdateProfile *=============================
  export const postUpdateProfile = async (updatedUser)=>{
    const token = sessionStorage.getItem("token");

    if (!token) {
      console.error("No token found. User not logged in");
      return;
    }

    try {
     await axios.put('http://localhost:4445/api/home/update-profile', updatedUser, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      })

    } catch (err) {
      console.error('Error while updating profile: ', err);
      console.error("Responser from server: ", err.response?.data?.message);
      
      
      
    }
  };

  export const getScreenTitle = () => {
    const path = location.pathname;

    if (path.startsWith('/home/job-details/')) { 
      return "Job Details";
  }

    switch (path) {
      case "/home":
        return "Dashboard";
      case "/home/add-job":
        return "Add Job";
      case "/home/all-jobs":
        return "Applied Jobs";
      case "/home/insights":
        return "Insights";
      case "/home/profile":
        return "Profile";

      default:
        return "Unknown Page";
    }
  };