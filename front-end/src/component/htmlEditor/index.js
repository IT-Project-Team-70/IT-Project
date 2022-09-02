import React, { memo } from 'react'
import PropTypes from 'prop-types'
import JoditEditor from 'jodit-react'
import DOMPurify from 'dompurify'
import classNames from 'classnames'
import { Box, Typography } from '@mui/material'
import './index.scss'

const HtmlEditor = (props) => {
  const {
    value = '',
    error = false,
    helperText = '',
    defaultValue = '',
    onChange = (value) => {},
    onBlur = (value) => {},
    minHeight = '0px',
    height = '300px',
    readOnly = false,
    config = {},
    className = '',
    ...other
  } = props

  //prevent xss
  const sanitizedValue = DOMPurify.sanitize(value)
  const sanitizedDefaultValue = DOMPurify.sanitize(defaultValue)

  React.useEffect(() => {
    return () => {
      var elements = document.getElementsByClassName('jodit--container')
      while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0])
      }
    }
  }, [])

  const makeConfig = () => {
    const readOnlyConfig = {
      readonly: true,
      toolbar: false,
      showCharsCounter: false,
      showWordsCounter: false,
      showXPathInStatusbar: false,
    }

    const editableConfig = {
      readonly: false,
      style: { backgroundColor: 'white' },
      minHeight: minHeight,
      height: height,
      uploader: {
        insertImageAsBase64URI: true,
      },
      allowTabNavigation: true,
      askBeforePasteFromWord: false,
      askBeforePasteHTML: false,
      allowResizeX: true,
      allowResizeY: true,
    }

    return readOnly
      ? { ...editableConfig, ...readOnlyConfig, ...config }
      : { ...editableConfig, ...config }
  }

  // joditRef.current.make('#editor', { width: '100%', height: '100%' })
  return (
    <Box
      display="flex"
      flexDirection="column"
      width="100%"
      className={classNames('htmlEditor-root', className, {
        'htmlEditor-root-error': Boolean(error),
      })}
      {...other}
    >
      <Typography variant="caption" color={error ? 'error' : 'textSecondary'}>
        {helperText}
      </Typography>
      <Box width="100%" flexGrow={1}>
        <JoditEditor
          config={makeConfig()}
          tabIndex={1} // tabIndex of textarea
          value={sanitizedValue || sanitizedDefaultValue}
          onBlur={onBlur}
          onChange={onChange}
        />
      </Box>
    </Box>
  )
}

HtmlEditor.propTypes = {
  /**If the value changes, the component will be updated and some [bugs](https://github.com/jodit/jodit-react/issues/43#issuecomment-580152633) may be introduced. */
  value: PropTypes.string,

  /**Set the default value when the component is mounted (It will only be updated once after the component is mounted) . */
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  minHeight: PropTypes.string,
  height: PropTypes.string,
  /**Ref to JoditEditor options. */
  config: PropTypes.object,
  readOnly: PropTypes.bool,
  className: PropTypes.string,
  helperText: PropTypes.node,
  error: PropTypes.bool,
}

function areEqual(prev, curr) {
  return (
    prev.value === curr.value &&
    prev.helperText === curr.helperText &&
    prev.error === curr.error
  )
}

export default memo(HtmlEditor, areEqual)
