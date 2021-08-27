import { useSetRecoilState } from 'recoil';
import { assignmentTeacherDrawerId } from '../../../../atoms';

const ResponseDetails = () => {
    const setIndex = useSetRecoilState(assignmentTeacherDrawerId);
    return ( 
        <div>
            <h1>Response Details</h1>
            <button onClick={()=>setIndex(2)}>Go back to response list</button>
        </div>
     );
}
 
export default ResponseDetails;