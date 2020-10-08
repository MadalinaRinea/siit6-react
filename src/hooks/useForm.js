const { useState, useEffect } = require("react");

let newErrors = [];
export default function useForm(outsideValues, validationRules) {
    const [values, setValues] = useState(outsideValues);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        setValues(outsideValues);
    }, [outsideValues]);

    function handleInputChange(e) {
        const rules = validationRules[e.target.name];
        setValues({ ...values, [e.target.name]: e.target.value });

        if(rules) {
            newErrors = newErrors.filter(error => error.field !== e.target.name);
            for(const rule of rules) {
                if(rule.name === 'required' && !e.target.value) {
                    // Avem o eraore
                    newErrors.push({field: e.target.name, message: `Please provide a value for '${e.target.name}'.`});
                }
                if(rule.name === 'min-length' && e.target.value.length < rule.value) {
                    // Avem o eroare
                    newErrors.push({field: e.target.name, message: `The value for  '${e.target.name}' needs to be at least ${rule.value} characters long.`});
                }
            }

            setErrors([...newErrors]);
        }
    }

    return {
        values,
        handleInputChange,
        errors,
        inputProps: (inputName, type='text') => ({
            name: inputName,
            value: values?.[inputName] || '',
            onChange: handleInputChange
        })
    }
}