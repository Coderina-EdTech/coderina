// import { useEffect, useState } from "react";
// import axios from "axios";
// import News from "../../Home/News";

// export default function MediaBlog() {
//   const [blogs, setBlogs] = useState([]);
//   const [likesAndComments, setLikesAndComments] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function fetchBlogs() {
//       try {
//         setLoading(true);
//         setError(null);

//         // Fetch blogs filtered by "new Articles" category
//         const res = await axios.get(`/api/blog?category=new Articles`);
//         const fetchedBlogs = res.data.data;

//         // Limit to the first 4 blogs
//         setBlogs(fetchedBlogs.slice(0, 4));

//         // Fetch likes and comments for each blog
//         const likesAndCommentsData = {};
//         await Promise.all(
//           fetchedBlogs.slice(0, 4).map(async (blog) => {
//             const data = await fetchLikesAndComments(blog._id);
//             likesAndCommentsData[blog._id] = data;
//           })
//         );
//         setLikesAndComments(likesAndCommentsData);
//       } catch (error) {
//         setError("Failed to fetch blogs. Please try again later.");
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchBlogs();
//   }, []);

//   const fetchLikesAndComments = async (blogId) => {
//     try {
//       const res = await axios.get(`/api/likesandcomments?id=${blogId}`);
//       const blogData = res.data.data;

//       return {
//         likesCount: blogData.likes.length,
//         commentsCount: blogData.comments.length,
//         liked: false,
//       };
//     } catch (error) {
//       console.error("Failed to fetch likes and comments count:", error);
//       return { likesCount: 0, commentsCount: 0, liked: false }; // Fallback data
//     }
//   };

//   const handleLike = async (blogId) => {
//     const updatedLikesAndComments = { ...likesAndComments };
//     const blogData = updatedLikesAndComments[blogId];

//     if (!blogData) return;

//     // Toggle the 'liked' state
//     blogData.liked = !blogData.liked;

//     // Update likes count based on the 'liked' state
//     blogData.likesCount += blogData.liked ? 1 : -1;
//     setLikesAndComments(updatedLikesAndComments);

//     try {
//       await axios.post(`/api/likesandcomments`, {
//         blogId,
//         action: "like",
//         email: "user@example.com", // Replace with authenticated user's email
//       });
//     } catch (error) {
//       console.error("Failed to update like status on the server:", error);
//     }
//   };

//   const formatTime = (timestamp) => {
//     const now = new Date();
//     const postDate = new Date(timestamp);
//     const seconds = Math.floor((now - postDate) / 1000);
//     const minutes = Math.floor(seconds / 60);
//     const hours = Math.floor(minutes / 60);
//     const days = Math.floor(hours / 24);

//     if (seconds < 60) return `${seconds} seconds ago`;
//     if (minutes < 60) return `${minutes} minutes ago`;
//     if (hours < 24) return `${hours} hours ago`;
//     if (days < 30) return `${days} days ago`;

//     return postDate.toLocaleDateString(undefined, {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   return (
//     <div>
//       <News
//         blogs={blogs}
//         formatTime={formatTime}
//         handleLike={handleLike}
//         likesAndComments={likesAndComments}
//         loading={loading}
//       />
//     </div>
//   );
// }













// ) : (
//   <div className="w-full grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//     {error ? (
//       <div className="flex justify-center items-center w-full">
//         <p className="text-red-500 text-center">{error}</p>
//       </div>
//     ) : blog.length === 0 ? (
//       <div className="flex justify-center items-center w-full">
//         <p className="text-center text-gray-500">
//           No blogs available for this category.
//         </p>
//       </div>
//     ) : (
//       blog.map((blog) => {
//         const { likesCount, commentsCount, liked } =
//           likesAndComments[blog._id] || {};

//         return (
//           <div
//             key={blog._id}
//             className="flex flex-col items-start justify-start w-full max-w-[340px] mx-auto space-y-2"
//           >
//             {blog.images?.length > 0 && (
//               <div className="w-full h-[210px]">
//                 <Image
//                   src={blog.images[0]}
//                   alt={blog.title}
//                   width={330}
//                   height={210}
//                   className="object-cover w-full h-full rounded-2xl"
//                   onClick={() => openModal(blog.images)}
//                 />
//               </div>
//             )}
//             <div>
//               <p className="text-[12.6px] font-medium mb-2">
//                 {formatTime(blog.createdAt)}
//               </p>
//               <p className="text-[13px] font-medium mb-1">{blog.title}</p>
//             </div>
//             <div className="h-14">
//               <LikeAndComment
//                 likes={likesCount}
//                 comments={commentsCount}
//                 liked={liked}
//                 toggleLike={() => handleLike(blog._id)}
//               />
//               <Link
//                 href={`/Media/${blog._id}`}
//                 passHref
//               >
//                 <p className="text-blue-500 hover:underline text-[13px] py-2 cursor-pointer">
//                   {category === "gallery"
//                     ? "View All"
//                     : "Read More"}
//                 </p>
//               </Link>
//             </div>
//           </div>
//         );
//       })
//     )}
//   </div>
// )