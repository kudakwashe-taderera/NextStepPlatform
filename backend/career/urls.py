from django.urls import path
from .views import (
    SubjectListView, SubjectDetailView, UniversityListView, UniversityDetailView,
    ProgramListView, ProgramDetailView, CareerPathListView, CareerPathDetailView,
    RecommendationListView, RecommendationDetailView, CareerQuizListView,
    CareerQuizDetailView, SubmitQuizView, QuizResultListView, QuizResultDetailView,
    GetALevelRecommendationsView, GetOLevelRecommendationsView, GetProgramRecommendationsView,
    GetCareerRecommendationsView
)

urlpatterns = [
    # Subjects
    path('subjects/', SubjectListView.as_view(), name='subject_list'),
    path('subjects/<uuid:pk>/', SubjectDetailView.as_view(), name='subject_detail'),
    
    # Universities
    path('universities/', UniversityListView.as_view(), name='university_list'),
    path('universities/<uuid:pk>/', UniversityDetailView.as_view(), name='university_detail'),
    
    # Programs
    path('programs/', ProgramListView.as_view(), name='program_list'),
    path('programs/<uuid:pk>/', ProgramDetailView.as_view(), name='program_detail'),
    
    # Career Paths
    path('career-paths/', CareerPathListView.as_view(), name='career_path_list'),
    path('career-paths/<uuid:pk>/', CareerPathDetailView.as_view(), name='career_path_detail'),
    
    # Recommendations
    path('recommendations/', RecommendationListView.as_view(), name='recommendation_list'),
    path('recommendations/<uuid:pk>/', RecommendationDetailView.as_view(), name='recommendation_detail'),
    
    # Quizzes
    path('quizzes/', CareerQuizListView.as_view(), name='career_quiz_list'),
    path('quizzes/<uuid:pk>/', CareerQuizDetailView.as_view(), name='career_quiz_detail'),
    path('quizzes/<uuid:pk>/submit/', SubmitQuizView.as_view(), name='submit_quiz'),
    
    # Quiz Results
    path('quiz-results/', QuizResultListView.as_view(), name='quiz_result_list'),
    path('quiz-results/<uuid:pk>/', QuizResultDetailView.as_view(), name='quiz_result_detail'),
    
    # Recommendation Engines
    path('recommend/a-level/', GetALevelRecommendationsView.as_view(), name='recommend_a_level'),
    path('recommend/o-level/', GetOLevelRecommendationsView.as_view(), name='recommend_o_level'),
    path('recommend/programs/', GetProgramRecommendationsView.as_view(), name='recommend_programs'),
    path('recommend/careers/', GetCareerRecommendationsView.as_view(), name='recommend_careers'),
]
