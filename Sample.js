const intervalId = useRef();

  useEffect(() => {
    dispatch({ type: "FETCH_MESSAGES", payload: `${params.id}` });

    // Start the interval
    intervalId.current = setInterval(() => {
      dispatch({ type: "FETCH_MESSAGES", payload: params.id });
    }, 500);

    // Return a cleanup function to cancel the interval when the component unmounts
    return () => clearInterval(intervalId.current);
  }, []);

  const messageList = useSelector(
    store => store.candidateReducer.messageList
  );

  const [message, setMessage] = useState("");
  const user = useSelector((store) => store.user);

  function handleChange(event) {
    setMessage(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch({
      type: "ADD_MESSAGE",
      payload: {
        jobId: `${params.id}`,
        message: message
      }
    });
    setMessage(""); // Reset the value of message to an empty string
  }
