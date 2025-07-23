import React, { useEffect, useState } from 'react'
import CommentTableItem from '../../components/admin/CommentTableItem';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';


const Comments = () => {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState('Not Approved');
  const [loading, setLoading] = useState(true);
  const {axios, token} = useAppContext();

  const fetchComments = async () => {
    try {
      setLoading(true);
      console.log('Fetching admin comments with token:', token ? 'Present' : 'Missing');
      const {data} = await axios.get('/api/admin/comments');
      console.log('Comments response:', data);
      if (data.success) {
        setComments(data.comments || []);
        console.log('Comments set:', data.comments?.length || 0, 'comments');
      } else {
        toast.error(data.message);
        console.error('API returned error:', data.message);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
      if (error.response?.status === 401) {
        toast.error("Unauthorized. Please login again.");
      } else {
        toast.error(error.response?.data?.message || "Error fetching comments");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (token) {
      fetchComments();
    }
  }, [token])
  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50'>
      <div className='flex justify-between items-center max-w-3xl'>
        <h1 className='text-2xl font-bold text-gray-800 mb-4'>Comments</h1>
        <div className='flex gap-4'>
          <button onClick={() => setFilter('Approved')} className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${filter==='Approved' ? 'text-primary':'text-gray-700'}`}>Approved</button>
          <button onClick={() => setFilter('Not Approved')} className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${filter==='Not Approved' ? 'text-primary':'text-gray-700'}`}>Not Approved</button>
        </div>

      </div>
      <div className='relative h-4/5 max-w-3xl overflow-x-auto mt-4 bg-white rounded-lg shadow scrollbar-hide'>
        <table className='w-full text-sm text-gray-500'>
          <thead className='text-xs text-gray-700 text-left uppercase'>
            <tr>
              <th scope='col' className='px-6 py-4'>
                Blog title and comment
              </th>
              <th scope='col' className='px-6 max-sm:hidden py-4'>
                Date
              </th>
              <th scope='col' className='px-6 py-4'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                  Loading comments...
                </td>
              </tr>
            ) : comments && comments.length > 0 ? (
              (() => {
                const filteredComments = comments.filter(comment => 
                  filter === 'Not Approved' ? !comment.isApproved : comment.isApproved
                );
                console.log('Filtered comments:', filteredComments.length, 'for filter:', filter);
                return filteredComments.length > 0 ? 
                  filteredComments.map((comment, index) => (
                    <CommentTableItem key={comment._id} comment={comment} fetchComments={fetchComments} />
                  )) :
                  <tr>
                    <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                      No {filter.toLowerCase()} comments found
                    </td>
                  </tr>
              })()
            ) : (
              <tr>
                <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                  No comments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
    </div>
  )
}

export default Comments
