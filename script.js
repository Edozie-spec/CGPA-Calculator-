// Data storage
let subjects = [];
let editingIndex = -1;

// DOM Elements
const subjectNameInput = document.getElementById('subjectName');
const subjectGradeInput = document.getElementById('subjectGrade');
const subjectCreditInput = document.getElementById('subjectCredit');
const addEditBtn = document.getElementById('addEditBtn');
const subjectTableBody = document.getElementById('subjectTableBody');
const cgpaValue = document.getElementById('cgpaValue');
const calculateBtn = document.getElementById('calculateBtn');
const resetBtn = document.getElementById('resetBtn');

// Event Listeners
addEditBtn.addEventListener('click', handleAddEditSubject);
calculateBtn.addEventListener('click', calculateCGPA);
resetBtn.addEventListener('click', resetAll);

// Add or Edit Subject
function handleAddEditSubject() {
    const subjectName = subjectNameInput.value.trim();
    const grade = subjectGradeInput.value;
    const credit = parseInt(subjectCreditInput.value);
    

    if (!subjectName) {
        alert('Ensure to enter a subject name');
        return;
    }
    
    if (!credit || credit < 0) {
        alert('Ensure you enter a valid credit value (at least 0)');
        return;
    }
    
    if (editingIndex === -1) {
    
        subjects.push({ 
            name: subjectName, 
            grade: grade, 
            credit: credit 
        });
    } else {
    
        subjects[editingIndex] = { 
            name: subjectName, 
            grade: grade, 
            credit: credit 
        };
        editingIndex = -1;
        addEditBtn.textContent = 'Add Subject';
    }
    
    updateSubjectTable();
    clearForm();
}


function editSubject(index) {
    const subject = subjects[index];
    subjectNameInput.value = subject.name;
    subjectGradeInput.value = subject.grade;
    subjectCreditInput.value = subject.credit;
    editingIndex = index;
    addEditBtn.textContent = 'Update Subject';
    subjectNameInput.focus();
}


function deleteSubject(index) {
    if (confirm('Are you sure you want to delete this subject ?')) {
        subjects.splice(index, 1);
        updateSubjectTable();
        

        if (editingIndex === index) {
            editingIndex = -1;
            addEditBtn.textContent = 'Add Subject';
            clearForm();
        }
    }
}

// Update the subject table
function updateSubjectTable() {
    subjectTableBody.innerHTML = '';
    
    if (subjects.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td colspan="4" style="text-align: center; padding: 20px; color: #6c757d;">
                Ensure you input a subject. Add your first subject above.
            </td>
        `;
        subjectTableBody.appendChild(row);
        return;
    }
    
    subjects.forEach((subject, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${subject.name}</td>
            <td>${subject.grade}</td>
            <td>${subject.credit}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-warning btn-sm" onclick="editSubject(${index})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteSubject(${index})">Delete</button>
                </div>
            </td>
        `;
        subjectTableBody.appendChild(row);
    });
}


function calculateCGPA() {
    if (subjects.length === 0) {
        cgpaValue.textContent = '0.00';
        return;
    }
    
    let totalCredits = 0;
    let totalGradePoints = 0;
    
    subjects.forEach(subject => {
        const gradePoint = getGradePoint(subject.grade);
        totalGradePoints += gradePoint * subject.credit;
        totalCredits += subject.credit;
    });
    
    const cgpa = totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : 0.00;
    cgpaValue.textContent = cgpa;
    

    cgpaValue.style.transform = 'scale(1.1)';
    setTimeout(() => {
        cgpaValue.style.transform = 'scale(1)';
    }, 300);
}


function getGradePoint(grade) {
    const gradePoints = { 
        'A': 5, 
        'B': 4, 
        'C': 3, 
        'D': 2, 
        'E': 1, 
        'F': 0
    };
    return gradePoints[grade] || 0;
}


function resetAll() {
    if (confirm('Are you sure you want to reset all data? This cannot be undone.')) {
        subjects = [];
        editingIndex = -1;
        addEditBtn.textContent = 'Add Subject';
        updateSubjectTable();
        clearForm();
        cgpaValue.textContent = '0.00';
    }
}


function clearForm() {
    subjectNameInput.value = '';
    subjectGradeInput.value = 'A';
    subjectCreditInput.value = '';
    subjectNameInput.focus();
}


updateSubjectTable();