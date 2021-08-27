import { useSetRecoilState } from 'recoil';
import { assignmentTeacherDrawerId } from '../../../../atoms';

const AssignmentList = () => {
    const setIndex = useSetRecoilState(assignmentTeacherDrawerId);
    return ( 
        <div>
            <h1>Created assignment List</h1>
            <button onClick={()=>setIndex(1)}>Go to specific assignment page</button>
        </div>
     );
}
 
export default AssignmentList;