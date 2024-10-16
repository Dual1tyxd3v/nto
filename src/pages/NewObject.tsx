import ObjectForm from '../components/ObjectForm';
import { AppRoute, Auth } from '../config';
import { useCheckAuth } from '../hooks/useCheckAuth';

export default function NewObject() {
  useCheckAuth(Auth.AUTH, AppRoute.LOGIN);
  return <ObjectForm />;
}
