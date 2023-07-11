import './App.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function App() {
  const formik = useFormik({
    initialValues: {
      fullName: '',
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
      check: '',
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Required !'),
      userName: Yup.string().required('Required !').min(10, 'Too short !').max(30, 'Too Long !'),
      email: Yup.string().required('Required !').email('Invalid email address'),
      password: Yup.string()
        .required('Required !')
        .min(10, 'Too short !')
        .max(30, 'Too Long !')
        .matches(/^(?=.*[a-z])/, ' Must Contain One Lowercase Character')
        .matches(/^(?=.*[A-Z])/, '  Must Contain One Uppercase Character')
        .matches(/^(?=.*[0-9])/, '  Must Contain One Number Character')
        .matches(/^(?=.*[!@#\$%\^&\*])/, '  Must Contain  One Special Case Character'),
      confirmPassword: Yup.string()
        .required('Required !')
        .oneOf([Yup.ref('password')], 'Your passwords do not match.'),
      check: Yup.boolean().required('Required !'),
    }),
    onSubmit: (values, { resetForm }) => {
      alert(JSON.stringify(values, null, 2));
      resetForm();
    },
  });

  return (
    <div className="app">
      <form onSubmit={formik.handleSubmit}>
        <div className="container-form-field">
          <div className="form-field">
            <Form.Label htmlFor="fullName">Full Name</Form.Label>
            <Form.Control type="text" id="fullName" onChange={formik.handleChange} value={formik.values.fullName} />
            {formik.touched.fullName && formik.errors.fullName ? (
              <span style={{ color: 'red' }}>{formik.errors.fullName}</span>
            ) : null}
          </div>

          <div className="form-field">
            <Form.Label htmlFor="userName">User Name</Form.Label>
            <Form.Control type="text" id="userName" onChange={formik.handleChange} value={formik.values.userName} />
            {formik.touched.userName && formik.errors.userName ? (
              <span style={{ color: 'red' }}>{formik.errors.userName}</span>
            ) : null}
          </div>

          <div className="form-field">
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Control type="email" id="email" onChange={formik.handleChange} value={formik.values.email} />
            {formik.touched.email && formik.errors.email ? (
              <span style={{ color: 'red' }}>{formik.errors.email}</span>
            ) : null}
          </div>
          <div className="form-field">
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control type="password" id="password" onChange={formik.handleChange} value={formik.values.password} />
            {formik.touched.password && formik.errors.password ? (
              <span style={{ color: 'red' }}>{formik.errors.password}</span>
            ) : null}
          </div>

          <div className="form-field">
            <Form.Label htmlFor="confirmPassword">Confirm Password</Form.Label>
            <Form.Control
              type="password"
              id="confirmPassword"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <span style={{ color: 'red' }}>{formik.errors.confirmPassword}</span>
            ) : null}
          </div>

          <Form.Check
            type="checkbox"
            label="I have read and agree to the Terms"
            name="check"
            onChange={formik.handleChange}
            value={formik.values.check}
          />
          {formik.touched.check && formik.errors.check ? (
            <span style={{ color: 'red' }}>{formik.errors.check}</span>
          ) : null}

          <div className="container-button">
            <Button type="submit" variant="primary">
              Register
            </Button>
            <Button variant="warning" onClick={() => formik.resetForm()}>
              Reset
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
