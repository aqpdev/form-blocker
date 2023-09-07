# form-blocker
Library to block form elements to process the submission.

## Installation

```bash
npm i @aqpdev/form-blocker
```

## Usage

### React example
```javascript
import React from "react"
import {FormBlocker} from "form-blocker";
export default function Home()
{
    const ref = useRef(null);

    const myHandle = (e) => {
        e.preventDefault();
        const myForm = FormBlocker(ref);
        // Block form elements
        myForm.blockForm();
        
        // Process form...        
        const formData = myForm.formData();
        
        // Unblock form elements
        myForm.unblockForm();
    }


    return (
        <form id="myFormId" onSubmit={myHandle} ref={ref}>
            <div className="mb-3">
                <label className="form-label">Username</label>
                <input type="text" name="username" className="form-control"/>

            </div>

            <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" name="password" className="form-control"/>

            </div>

            <div>
                <button className="btn btn-primary">Submit</button><br/>
            </div>
        </form>
    )
}
```

### Lib Example
```javascript
import {FormBlocker} from "form-blocker";

const myForm = FormBlocker(formID);
// Block form elements
myForm.blockForm();

// Process form...        
const formData = myForm.formData();

// Unblock form elements
myForm.unblockForm();

```

By default, a spinner will be displayed in submit buttons

#### Disabling spinner

```javascript
myForm.blockForm(false);
```

#### Change size of spinner

```javascript
myForm.blockForm(true, 32);
```
