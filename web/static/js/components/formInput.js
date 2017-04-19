import React from "react"

// This creates and displays a form input
const InputElement = (props) => {

  var error = null
  var classDiv = 'form-group'

  if(props.submitted){
    if (props.valid) classDiv += ' has-success'
    else {
      classDiv += ' has-error'
      if(props.error) error = <span className="help-block">{props.error}</span>
    }
  }

  var label = (props.label)
    ? <label className="control-label" htmlFor={props.name}>
        {props.label}
      </label>
    : null

  var name = (props.form)
    ? props.form + '[' + props.name + ']'
    : props.name

  var type = (props.type) ? props.type : 'text'

  var placeholder = props.placeholder || ''
  var value = props.value || ''

  return(
    <div className={classDiv}>
      {label}
      <input
        id          = {props.name}
        name        = {name}
        type        = {type}
        className   = "form-control"
        placeholder = {placeholder}
        value       = {value}
        onChange    = {(e) => props.onChange(e)}
      />
      {error}
    </div>
  )
}

export default InputElement