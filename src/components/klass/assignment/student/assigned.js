import { useSetRecoilState } from 'recoil';
import { assignmentStudentDrawerId } from '../../../../atoms';

const Assigned = () => {
    const setIndex = useSetRecoilState(assignmentStudentDrawerId);
    return (        
        <div>
            <h1>Assigned Assignment List</h1>
            <button onClick={()=> setIndex(2)}>Go to Assignment Details</button>
        </div>
    );
}
 
export default Assigned;