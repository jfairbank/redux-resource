import fetchResource from './helpers/fetchResource';
import omit from './helpers/omit';
import parseUrl from './helpers/parseUrl';
import assign from './helpers/assign';

export default function createResourceAction(
  options, sendType, successType, errorType
) {
  let rawUrl, urlCompiler;

  if (typeof options === 'string') {
    rawUrl = options;
    options = {};
  } else {
    rawUrl = options.url;
    options = omit(options, ['url']);
  }

  if (!rawUrl) {
    throw new Error('Please provide a url for the resource');
  }

  urlCompiler = parseUrl(rawUrl);

  const resourceSendAction = () => ({ type: sendType });

  const resourceSuccessAction = (resource) => ({
    type: successType,
    payload: resource
  });

  const resourceErrorAction = (error) => ({
    type: errorType,
    payload: error
  });

  return (params, data) => (dispatch) => {
    const url = urlCompiler(params);

    dispatch(resourceSendAction());

    return fetchResource(url, assign({}, options, { data })).then(
      resource => dispatch(resourceSuccessAction(resource)),
      error => dispatch(resourceErrorAction(error))
    );
  };
}
