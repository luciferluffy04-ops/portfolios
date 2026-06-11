async function handleLogin(e: React.FormEvent) {
  e.preventDefault()
  setError('')
  setLoading(true)

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    setError(error.message)
    setLoading(false)
    return
  }

  if (data.session) {
    window.location.href = next
  } else {
    setError('Login failed. Please try again.')
    setLoading(false)
  }
}