import { useState, useRef } from "react";
import "./Report.css";
export default function Reports() {
  const today = new Date().toISOString().split("T")[0];
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    designation: "",
    salary: "",
    gender: "",
    hireDate: "",
    about: "",
    files: [] as File[],
    termsAccepted: false,
  });

  const isRequiredFieldsFilled = () => {
    return (
      employee.firstName.trim() &&
      employee.lastName.trim() &&
      employee.email.trim() &&
      employee.department &&
      employee.gender &&
      employee.hireDate &&
      employee.termsAccepted
    );
  };

  const validate = (data = employee) => {
    const newErrors: Record<string, string> = {};

    if (!data.firstName.trim()) newErrors.firstName = "First Name is required";
    if (data.firstName.length > 50) newErrors.firstName = "Max 50 characters";

    if (!data.lastName.trim()) newErrors.lastName = "Last Name is required";
    if (data.lastName.length > 50) newErrors.lastName = "Max 50 characters";

    if (!data.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!data.department) newErrors.department = "Department is required";
    if (!data.gender) newErrors.gender = "Gender is required";

    if (!data.hireDate) {
      newErrors.hireDate = "Hire Date is required";
    } else if (data.hireDate < today) {
      newErrors.hireDate = "Past date not allowed";
    }

    if (data.salary) {
      const salary = Number(data.salary);
      if (salary < 10000 || salary > 1000000) {
        newErrors.salary = "Salary must be between 10,000 and 1,000,000";
      }
    }

    if (!data.termsAccepted) {
      newErrors.termsAccepted = "You must accept terms";
    }

    return newErrors;
  };
  const isFormValid =
    isRequiredFieldsFilled() && Object.keys(errors).length === 0;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const target = e.target as HTMLInputElement;

    if (target.type === "file" && target.files) {
      setEmployee((prev) => ({ ...prev, files: Array.from(target.files) }));
      return;
    }

    const value = target.type === "checkbox" ? target.checked : target.value;

    const updated = { ...employee, [target.name]: value };
    setEmployee(updated);
    setErrors(validate(updated));
  };

  const handleSubmit = (e: React.FormEvent) => {
    alert("Submited");
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log(employee);
  };

  const handleClear = () => {
    setEmployee({
      firstName: "",
      lastName: "",
      email: "",
      department: "",
      designation: "",
      salary: "",
      gender: "",
      hireDate: "",
      about: "",
      files: [],
      termsAccepted: false,
    });
    setErrors({});
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="form-container">
      <h2>Employee Form</h2>

      <form onSubmit={handleSubmit}>
        {/* Row 1 */}
        <div className="row">
          <div className="col">
            <label htmlFor="firstName">First Name *</label>
            <input
              id="firstName"
              name="firstName"
              maxLength={50}
              type="text"
              value={employee.firstName}
              onChange={handleChange}
            />
            <span className="error">{errors.firstName}</span>
          </div>

          <div className="col">
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              maxLength={50}
              type="text"
              value={employee.lastName}
              onChange={handleChange}
            />
            <span className="error">{errors.lastName}</span>
          </div>
        </div>

        {/* Row 2 */}
        <div className="row">
          <div className="col">
            <label htmlFor="email">Email *</label>
            <input
              id="email"
              name="email"
              type="email"
              value={employee.email}
              onChange={handleChange}
            />
            <span className="error">{errors.email}</span>
          </div>

          <div className="col">
            <label htmlFor="department">Department *</label>
            <select
              id="department"
              name="department"
              value={employee.department}
              onChange={handleChange}
            >
              <option value="">Select department</option>
              <option value="HR">HR</option>
              <option value="IT">IT</option>
              <option value="Finance">Finance</option>
              <option value="Operations">Operations</option>
            </select>
            <span className="error">{errors.department}</span>
          </div>
        </div>

        {/* Row 3 */}
        <div className="row">
          <div className="col">
            <label htmlFor="designation">Designation</label>
            <input
              id="designation"
              name="designation"
              type="text"
              value={employee.designation}
              onChange={handleChange}
            />
          </div>

          <div className="row">
            <div className="col">
              <label htmlFor="salary">Salary</label>
              <input
                id="salary"
                type="number"
                name="salary"
                min={10000}
                max={1000000}
                value={employee.salary}
                onChange={handleChange}
              />
              <span className="error">{errors.salary}</span>
            </div>
          </div>
        </div>
        {/* Row 4 */}
        <div className="row">
          <div className="col">
            <label>Gender *</label>
            <div className="radio-group">
              {["Male", "Female", "Other"].map((g) => (
                <label key={g}>
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={employee.gender === g}
                    onChange={handleChange}
                  />
                  {g}
                </label>
              ))}
            </div>
            <span className="error">{errors.gender}</span>
          </div>

          <div className="col">
            <label htmlFor="hireDate">Hire Date *</label>
            <input
              id="hireDate"
              type="date"
              name="hireDate"
              min={today}
              value={employee.hireDate}
              onChange={handleChange}
            />
            <span className="error">{errors.hireDate}</span>
          </div>
        </div>

        {/* Row 5 */}
        <div className="row">
          <div className="col">
            <label htmlFor="about">About</label>
            <textarea
              id="about"
              name="about"
              rows={4}
              value={employee.about}
              onChange={handleChange}
            />
          </div>

          <div className="col">
            <label htmlFor="files">Upload Files</label>
            <input
              id="files"
              type="file"
              name="files"
              multiple
              accept=".pdf,.doc,.docx,.jpg,.png"
              ref={fileInputRef}
              onChange={handleChange}
            />

            {Array.isArray(employee.files) && employee.files.length > 0 && (
              <ul>
                {employee.files.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
        {/* Terms */}
        <div className="row">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={employee.termsAccepted}
              onChange={handleChange}
            />
            I agree to the Terms and Conditions *
          </label>
          <span className="error">{errors.termsAccepted}</span>
        </div>
        {/* Actions */}
        {/* Actions */}
        <div className="row actions">
          <button type="submit" disabled={!isFormValid}>
            Submit
          </button>
          <button type="button" onClick={handleClear}>
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}
