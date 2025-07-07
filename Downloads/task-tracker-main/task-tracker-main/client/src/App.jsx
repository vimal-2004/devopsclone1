import './App.css'
import './animations.css'
import { Routes, Route, Link as RouterLink, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { login as apiLogin, register as apiRegister, getTeams, createTeam, joinTeam, getTasks, createTask, updateTask, deleteTask } from './api'
import { AppBar, Toolbar, Typography, Button, Box, Container, Paper, TextField, Grid, Card, CardContent, CardActions, Alert, Select, MenuItem, InputLabel, FormControl, CircularProgress, Chip, Avatar, Divider, IconButton, Tooltip } from '@mui/material';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Add as AddIcon, Group as GroupIcon, Task as TaskIcon, Dashboard as DashboardIcon, Logout as LogoutIcon, Person as PersonIcon, Email as EmailIcon, Lock as LockIcon } from '@mui/icons-material';

function Home() {
  const user = JSON.parse(localStorage.getItem('user') || 'null')
  return (
    <Box minHeight="100vh" sx={{ 
      background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)',
      position: 'relative',
      overflow: 'hidden'
    }} className="fade-in">
      {/* Background decoration */}
      <Box sx={{
        position: 'absolute',
        top: -50,
        right: -50,
        width: 200,
        height: 200,
        borderRadius: '50%',
        background: 'linear-gradient(45deg, var(--primary-light), var(--primary-color))',
        opacity: 0.1,
        animation: 'float 6s ease-in-out infinite'
      }} />
      <Box sx={{
        position: 'absolute',
        bottom: -30,
        left: -30,
        width: 150,
        height: 150,
        borderRadius: '50%',
        background: 'linear-gradient(45deg, var(--secondary-color), var(--accent-color))',
        opacity: 0.1,
        animation: 'float 8s ease-in-out infinite reverse'
      }} />

      <AppBar position="static" sx={{ 
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1 }}>
            <TaskIcon sx={{ color: 'var(--primary-color)', fontSize: 28 }} />
            <Typography variant="h6" sx={{ 
              fontWeight: 700,
              background: 'linear-gradient(45deg, var(--primary-color), var(--secondary-color))',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Team Task Tracker</Typography>
          </Box>
          {user ? (
            <Button 
              color="inherit" 
              component={RouterLink} 
              to="/dashboard" 
              className="animated-btn"
              startIcon={<DashboardIcon />}
              sx={{ 
                color: 'var(--text-primary)',
                fontWeight: 500,
                '&:hover': { color: 'var(--primary-color)' }
              }}
            >
              Dashboard
            </Button>
          ) : (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button 
                color="inherit" 
                component={RouterLink} 
                to="/login" 
                className="animated-btn"
                sx={{ 
                  color: 'var(--text-primary)',
                  fontWeight: 500,
                  '&:hover': { color: 'var(--primary-color)' }
                }}
              >
                Login
              </Button>
              <Button 
                variant="contained" 
                component={RouterLink} 
                to="/register" 
                className="animated-btn"
                sx={{ 
                  background: 'var(--primary-color)',
                  '&:hover': { background: 'var(--primary-dark)' }
                }}
              >
                Register
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 8, position: 'relative', zIndex: 1 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6} className="staggered-list">
            <Box>
              <Typography variant="h2" gutterBottom sx={{ 
                fontWeight: 800,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                lineHeight: 1.2,
                color: 'var(--text-primary)'
              }}>
                Streamline Your
                <Box component="span" sx={{ 
                  display: 'block',
                  background: 'linear-gradient(45deg, var(--primary-color), var(--secondary-color))',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  Team Workflow
                </Box>
              </Typography>
              <Typography variant="h6" sx={{ 
                color: 'var(--text-secondary)',
                mb: 4,
                lineHeight: 1.6,
                fontSize: '1.1rem'
              }}>
                Collaborate seamlessly with your team, assign tasks efficiently, and track progress in real-time. 
                Boost productivity with our intuitive task management platform.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {user ? (
                  <Button 
                    variant="contained" 
                    size="large" 
                    component={RouterLink} 
                    to="/dashboard" 
                    className="animated-btn pulse"
                    startIcon={<DashboardIcon />}
                    sx={{ 
                      background: 'var(--primary-color)',
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      '&:hover': { background: 'var(--primary-dark)' }
                    }}
                  >
                    Go to Dashboard
                  </Button>
                ) : (
                  <>
                    <Button 
                      variant="contained" 
                      size="large" 
                      component={RouterLink} 
                      to="/login" 
                      className="animated-btn"
                      startIcon={<PersonIcon />}
                      sx={{ 
                        background: 'var(--primary-color)',
                        px: 4,
                        py: 1.5,
                        fontSize: '1.1rem',
                        '&:hover': { background: 'var(--primary-dark)' }
                      }}
                    >
                      Get Started
                    </Button>
                    <Button 
                      variant="outlined" 
                      size="large" 
                      component={RouterLink} 
                      to="/register" 
                      className="animated-btn"
                      startIcon={<AddIcon />}
                      sx={{ 
                        borderColor: 'var(--primary-color)',
                        color: 'var(--primary-color)',
                        px: 4,
                        py: 1.5,
                        fontSize: '1.1rem',
                        '&:hover': { 
                          borderColor: 'var(--primary-dark)',
                          color: 'var(--primary-dark)',
                          background: 'rgba(99, 102, 241, 0.04)'
                        }
                      }}
                    >
                      Sign Up Free
                    </Button>
                  </>
                )}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ 
              p: 4, 
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid var(--border-color)',
              borderRadius: 3,
              position: 'relative',
              overflow: 'hidden'
            }} className="animated-card">
              <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 4,
                background: 'linear-gradient(90deg, var(--primary-color), var(--secondary-color))'
              }} />
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                Why Choose Team Task Tracker?
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 3 }}>
                {[
                  { icon: <GroupIcon />, title: 'Team Collaboration', desc: 'Work together seamlessly with real-time updates' },
                  { icon: <TaskIcon />, title: 'Smart Task Management', desc: 'Organize and prioritize tasks with ease' },
                  { icon: <DashboardIcon />, title: 'Progress Tracking', desc: 'Monitor team progress with visual insights' }
                ].map((feature, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ 
                      background: 'var(--primary-color)',
                      width: 40,
                      height: 40
                    }}>
                      {feature.icon}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
                        {feature.desc}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

function Dashboard() {
  const navigate = useNavigate()
  const [teams, setTeams] = useState([])
  const [selectedTeam, setSelectedTeam] = useState(null)
  const [tasks, setTasks] = useState([])
  const [teamName, setTeamName] = useState('')
  const [joinId, setJoinId] = useState('')
  const [taskTitle, setTaskTitle] = useState('')
  const [taskDesc, setTaskDesc] = useState('')
  const [error, setError] = useState('')
  const [loadingTeams, setLoadingTeams] = useState(false)
  const [loadingTasks, setLoadingTasks] = useState(false)
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  useEffect(() => {
    if (!user) navigate('/login')
    else fetchTeams()
    // eslint-disable-next-line
  }, [])

  async function fetchTeams() {
    try {
      setLoadingTeams(true)
      setTeams(await getTeams(user.id))
      setLoadingTeams(false)
    } catch (err) {
      setError(err.message)
      setLoadingTeams(false)
    }
  }

  async function handleCreateTeam(e) {
    e.preventDefault()
    setError('')
    try {
      await createTeam({ name: teamName, userId: user.id })
      setTeamName('')
      fetchTeams()
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleJoinTeam(e) {
    e.preventDefault()
    setError('')
    try {
      await joinTeam({ teamId: joinId, userId: user.id })
      setJoinId('')
      fetchTeams()
    } catch (err) {
      setError(err.message)
    }
  }

  async function selectTeam(team) {
    setSelectedTeam(team)
    setError('')
    try {
      setLoadingTasks(true)
      setTasks(await getTasks(team._id))
      setLoadingTasks(false)
    } catch (err) {
      setError(err.message)
      setLoadingTasks(false)
    }
  }

  async function handleCreateTask(e) {
    e.preventDefault()
    setError('')
    try {
      await createTask({ title: taskTitle, description: taskDesc, team: selectedTeam._id, userId: user.id })
      setTaskTitle('')
      setTaskDesc('')
      selectTeam(selectedTeam)
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleStatusChange(task, status) {
    setError('')
    try {
      await updateTask(task._id, { status })
      selectTeam(selectedTeam)
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleDeleteTask(task) {
    setError('')
    try {
      await deleteTask(task._id)
      selectTeam(selectedTeam)
    } catch (err) {
      setError(err.message)
    }
  }

  function handleLogout() {
    localStorage.removeItem('user')
    navigate('/')
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'To Do': return 'default'
      case 'In Progress': return 'warning'
      case 'Done': return 'success'
      default: return 'default'
    }
  }

  const getTaskStats = () => {
    const total = tasks.length
    const done = tasks.filter(t => t.status === 'Done').length
    const inProgress = tasks.filter(t => t.status === 'In Progress').length
    const todo = tasks.filter(t => t.status === 'To Do').length
    return { total, done, inProgress, todo }
  }

  const stats = getTaskStats()

  return (
    <Box minHeight="100vh" sx={{ 
      background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)'
    }} className="fade-in">
      <AppBar position="static" sx={{ 
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1 }}>
            <TaskIcon sx={{ color: 'var(--primary-color)', fontSize: 28 }} />
            <Typography variant="h6" sx={{ 
              fontWeight: 700,
              background: 'linear-gradient(45deg, var(--primary-color), var(--secondary-color))',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Team Task Tracker</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar sx={{ 
              background: 'var(--primary-color)',
              width: 32,
              height: 32,
              fontSize: '0.875rem'
            }}>
              {user?.name?.charAt(0) || 'U'}
            </Avatar>
            <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
              {user?.name}
            </Typography>
            <Tooltip title="Logout">
              <IconButton onClick={handleLogout} className="animated-btn" sx={{ color: 'var(--text-secondary)' }}>
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={4}>
          {/* Teams Section */}
          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ 
              p: 3, 
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid var(--border-color)',
              borderRadius: 3,
              height: 'fit-content'
            }} className="animated-card">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <GroupIcon sx={{ color: 'var(--primary-color)' }} />
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                  Your Teams
                </Typography>
              </Box>
              
              {loadingTeams ? (
                <Box display="flex" justifyContent="center" my={4}>
                  <CircularProgress sx={{ color: 'var(--primary-color)' }} />
                </Box>
              ) : (
                <Box className="staggered-list">
                  {teams.map(team => (
                    <Card 
                      key={team._id} 
                      sx={{ 
                        mb: 2, 
                        cursor: 'pointer',
                        border: selectedTeam && selectedTeam._id === team._id ? '2px solid var(--primary-color)' : '1px solid var(--border-color)',
                        background: selectedTeam && selectedTeam._id === team._id ? 'rgba(99, 102, 241, 0.04)' : 'white',
                        '&:hover': {
                          borderColor: 'var(--primary-color)',
                          background: 'rgba(99, 102, 241, 0.02)'
                        }
                      }} 
                      onClick={() => selectTeam(team)} 
                      className="team-card animated-card"
                    >
                      <CardContent sx={{ py: 2 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                          {team.name}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              )}

              <Divider sx={{ my: 3 }} />
              
              <Box component="form" onSubmit={handleCreateTeam} sx={{ mb: 3 }}>
                <TextField 
                  label="New team name" 
                  value={teamName} 
                  onChange={e => setTeamName(e.target.value)} 
                  fullWidth 
                  required 
                  size="small" 
                  className="animated-input"
                  sx={{ mb: 1 }}
                />
                <Button 
                  type="submit" 
                  variant="contained" 
                  fullWidth 
                  className="animated-btn"
                  startIcon={<AddIcon />}
                  sx={{ 
                    background: 'var(--primary-color)',
                    '&:hover': { background: 'var(--primary-dark)' }
                  }}
                >
                  Create Team
                </Button>
              </Box>

              <Box component="form" onSubmit={handleJoinTeam}>
                <TextField 
                  label="Team ID to join" 
                  value={joinId} 
                  onChange={e => setJoinId(e.target.value)} 
                  fullWidth 
                  required 
                  size="small" 
                  className="animated-input"
                  sx={{ mb: 1 }}
                />
                <Button 
                  type="submit" 
                  variant="outlined" 
                  fullWidth 
                  className="animated-btn"
                  startIcon={<GroupIcon />}
                  sx={{ 
                    borderColor: 'var(--primary-color)',
                    color: 'var(--primary-color)',
                    '&:hover': { 
                      borderColor: 'var(--primary-dark)',
                      color: 'var(--primary-dark)',
                      background: 'rgba(99, 102, 241, 0.04)'
                    }
                  }}
                >
                  Join Team
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Tasks Section */}
          <Grid item xs={12} md={8}>
            <Paper elevation={0} sx={{ 
              p: 3, 
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid var(--border-color)',
              borderRadius: 3,
              minHeight: 400
            }} className="animated-card">
              {selectedTeam ? (
                <>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                        Tasks for {selectedTeam.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
                        {stats.total} total tasks
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Chip label={`${stats.todo} To Do`} size="small" color="default" />
                      <Chip label={`${stats.inProgress} In Progress`} size="small" color="warning" />
                      <Chip label={`${stats.done} Done`} size="small" color="success" />
                    </Box>
                  </Box>

                  {loadingTasks ? (
                    <Box display="flex" justifyContent="center" my={4}>
                      <CircularProgress sx={{ color: 'var(--primary-color)' }} />
                    </Box>
                  ) : (
                    <TransitionGroup>
                      {tasks.map(task => (
                        <CSSTransition key={task._id} timeout={400} classNames="task">
                          <Card sx={{ 
                            mb: 2,
                            border: '1px solid var(--border-color)',
                            '&:hover': {
                              borderColor: 'var(--border-hover)'
                            }
                          }} className="animated-card">
                            <CardContent sx={{ py: 2 }}>
                              <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 2 }}>
                                <Box sx={{ flex: 1 }}>
                                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'var(--text-primary)', mb: 1 }}>
                                    {task.title}
                                  </Typography>
                                  <Typography variant="body2" sx={{ color: 'var(--text-secondary)', mb: 2 }}>
                                    {task.description}
                                  </Typography>
                                  <FormControl size="small" sx={{ minWidth: 150 }}>
                                    <InputLabel>Status</InputLabel>
                                    <Select
                                      value={task.status}
                                      label="Status"
                                      onChange={e => handleStatusChange(task, e.target.value)}
                                      className="status-badge"
                                    >
                                      <MenuItem value="To Do">To Do</MenuItem>
                                      <MenuItem value="In Progress">In Progress</MenuItem>
                                      <MenuItem value="Done">Done</MenuItem>
                                    </Select>
                                  </FormControl>
                                </Box>
                                <Tooltip title="Delete task">
                                  <IconButton 
                                    color="error" 
                                    onClick={() => handleDeleteTask(task)}
                                    className="animated-btn"
                                    size="small"
                                  >
                                    <AddIcon sx={{ transform: 'rotate(45deg)' }} />
                                  </IconButton>
                                </Tooltip>
                              </Box>
                            </CardContent>
                          </Card>
                        </CSSTransition>
                      ))}
                    </TransitionGroup>
                  )}

                  <Divider sx={{ my: 3 }} />

                  <Box component="form" onSubmit={handleCreateTask}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'var(--text-primary)', mb: 2 }}>
                      Add New Task
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={5}>
                        <TextField 
                          label="Task title" 
                          value={taskTitle} 
                          onChange={e => setTaskTitle(e.target.value)} 
                          fullWidth 
                          required 
                          size="small" 
                          className="animated-input"
                        />
                      </Grid>
                      <Grid item xs={12} md={5}>
                        <TextField 
                          label="Task description" 
                          value={taskDesc} 
                          onChange={e => setTaskDesc(e.target.value)} 
                          fullWidth 
                          size="small" 
                          className="animated-input"
                        />
                      </Grid>
                      <Grid item xs={12} md={2}>
                        <Button 
                          type="submit" 
                          variant="contained" 
                          fullWidth 
                          className="animated-btn"
                          startIcon={<AddIcon />}
                          sx={{ 
                            background: 'var(--primary-color)',
                            '&:hover': { background: 'var(--primary-dark)' }
                          }}
                        >
                          Add
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </>
              ) : (
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  height: 300,
                  textAlign: 'center'
                }}>
                  <TaskIcon sx={{ fontSize: 64, color: 'var(--text-muted)', mb: 2 }} />
                  <Typography variant="h6" sx={{ color: 'var(--text-secondary)', mb: 1 }}>
                    No Team Selected
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'var(--text-muted)' }}>
                    Select a team from the left panel to view and manage tasks
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
        
        {error && (
          <Alert 
            severity="error" 
            sx={{ mt: 3 }} 
            className="animated-alert error"
            onClose={() => setError('')}
          >
            {error}
          </Alert>
        )}
      </Container>
    </Box>
  )
}

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const res = await apiLogin({ email, password })
      localStorage.setItem('user', JSON.stringify(res.user))
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <Box minHeight="100vh" sx={{ 
      background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden'
    }} className="fade-in">
      {/* Background decoration */}
      <Box sx={{
        position: 'absolute',
        top: -100,
        right: -100,
        width: 300,
        height: 300,
        borderRadius: '50%',
        background: 'linear-gradient(45deg, var(--primary-light), var(--primary-color))',
        opacity: 0.1,
        animation: 'float 8s ease-in-out infinite'
      }} />
      <Box sx={{
        position: 'absolute',
        bottom: -80,
        left: -80,
        width: 250,
        height: 250,
        borderRadius: '50%',
        background: 'linear-gradient(45deg, var(--secondary-color), var(--accent-color))',
        opacity: 0.1,
        animation: 'float 10s ease-in-out infinite reverse'
      }} />

      <Paper elevation={0} sx={{ 
        p: 4, 
        width: 400,
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        border: '1px solid var(--border-color)',
        borderRadius: 3,
        position: 'relative',
        zIndex: 1
      }} className="animated-card">
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: 'linear-gradient(90deg, var(--primary-color), var(--secondary-color))'
        }} />
        
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Avatar sx={{ 
            background: 'var(--primary-color)',
            width: 56,
            height: 56,
            mx: 'auto',
            mb: 2
          }}>
            <PersonIcon sx={{ fontSize: 32 }} />
          </Avatar>
          <Typography variant="h4" sx={{ fontWeight: 700, color: 'var(--text-primary)', mb: 1 }}>
            Welcome Back
          </Typography>
          <Typography variant="body1" sx={{ color: 'var(--text-secondary)' }}>
            Sign in to your account to continue
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="animated-input"
            InputProps={{
              startAdornment: <EmailIcon sx={{ mr: 1, color: 'var(--text-muted)' }} />
            }}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="animated-input"
            InputProps={{
              startAdornment: <LockIcon sx={{ mr: 1, color: 'var(--text-muted)' }} />
            }}
          />
          <Button 
            type="submit" 
            variant="contained" 
            fullWidth 
            sx={{ 
              mt: 3, 
              py: 1.5,
              background: 'var(--primary-color)',
              '&:hover': { background: 'var(--primary-dark)' }
            }} 
            className="animated-btn"
          >
            Sign In
          </Button>
        </form>
        
        {error && (
          <Alert 
            severity="error" 
            sx={{ mt: 3 }} 
            className="animated-alert error"
            onClose={() => setError('')}
          >
            {error}
          </Alert>
        )}
        
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
            Don't have an account?{' '}
            <Button 
              component={RouterLink} 
              to="/register" 
              className="animated-btn"
              sx={{ 
                color: 'var(--primary-color)',
                textTransform: 'none',
                p: 0,
                minWidth: 'auto',
                '&:hover': { 
                  background: 'transparent',
                  color: 'var(--primary-dark)'
                }
              }}
            >
              Sign up here
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Box>
  )
}

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const res = await apiRegister({ name, email, password })
      localStorage.setItem('user', JSON.stringify(res.user))
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <Box minHeight="100vh" sx={{ 
      background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden'
    }} className="fade-in">
      {/* Background decoration */}
      <Box sx={{
        position: 'absolute',
        top: -100,
        right: -100,
        width: 300,
        height: 300,
        borderRadius: '50%',
        background: 'linear-gradient(45deg, var(--primary-light), var(--primary-color))',
        opacity: 0.1,
        animation: 'float 8s ease-in-out infinite'
      }} />
      <Box sx={{
        position: 'absolute',
        bottom: -80,
        left: -80,
        width: 250,
        height: 250,
        borderRadius: '50%',
        background: 'linear-gradient(45deg, var(--secondary-color), var(--accent-color))',
        opacity: 0.1,
        animation: 'float 10s ease-in-out infinite reverse'
      }} />

      <Paper elevation={0} sx={{ 
        p: 4, 
        width: 400,
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        border: '1px solid var(--border-color)',
        borderRadius: 3,
        position: 'relative',
        zIndex: 1
      }} className="animated-card">
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: 'linear-gradient(90deg, var(--primary-color), var(--secondary-color))'
        }} />
        
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Avatar sx={{ 
            background: 'var(--secondary-color)',
            width: 56,
            height: 56,
            mx: 'auto',
            mb: 2
          }}>
            <AddIcon sx={{ fontSize: 32 }} />
          </Avatar>
          <Typography variant="h4" sx={{ fontWeight: 700, color: 'var(--text-primary)', mb: 1 }}>
            Create Account
          </Typography>
          <Typography variant="body1" sx={{ color: 'var(--text-secondary)' }}>
            Join us and start managing your team tasks
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Full Name"
            type="text"
            fullWidth
            margin="normal"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            className="animated-input"
            InputProps={{
              startAdornment: <PersonIcon sx={{ mr: 1, color: 'var(--text-muted)' }} />
            }}
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="animated-input"
            InputProps={{
              startAdornment: <EmailIcon sx={{ mr: 1, color: 'var(--text-muted)' }} />
            }}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="animated-input"
            InputProps={{
              startAdornment: <LockIcon sx={{ mr: 1, color: 'var(--text-muted)' }} />
            }}
          />
          <Button 
            type="submit" 
            variant="contained" 
            fullWidth 
            sx={{ 
              mt: 3, 
              py: 1.5,
              background: 'var(--secondary-color)',
              '&:hover': { background: 'var(--primary-dark)' }
            }} 
            className="animated-btn"
          >
            Create Account
          </Button>
        </form>
        
        {error && (
          <Alert 
            severity="error" 
            sx={{ mt: 3 }} 
            className="animated-alert error"
            onClose={() => setError('')}
          >
            {error}
          </Alert>
        )}
        
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
            Already have an account?{' '}
            <Button 
              component={RouterLink} 
              to="/login" 
              className="animated-btn"
              sx={{ 
                color: 'var(--primary-color)',
                textTransform: 'none',
                p: 0,
                minWidth: 'auto',
                '&:hover': { 
                  background: 'transparent',
                  color: 'var(--primary-dark)'
                }
              }}
            >
              Sign in here
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Box>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  )
}

export default App
