import { useSetRecoilState } from 'recoil';
import { assignmentTeacherDrawerId } from '../../../../atoms';

const GradedDetails = () => {
    const setIndex = useSetRecoilState(assignmentTeacherDrawerId);

    return ( 
        <div>
            <h1>Graded Details</h1>
            <button onClick={()=>setIndex(4)}>Go back to graded list</button>
        </div>
     );
}
 
export default GradedDetails;