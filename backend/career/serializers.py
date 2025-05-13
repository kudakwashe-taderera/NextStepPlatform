from rest_framework import serializers
from .models import (
    Subject, Program, University, CareerPath, Recommendation,
    CareerQuiz, QuizQuestion, QuizOption, QuizResult
)


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ['id', 'name', 'subject_code', 'level', 'description']


class UniversitySerializer(serializers.ModelSerializer):
    class Meta:
        model = University
        fields = ['id', 'name', 'country', 'address', 'description', 'website', 'logo_url']


class ProgramListSerializer(serializers.ModelSerializer):
    university_name = serializers.CharField(source='university.name', read_only=True)
    
    class Meta:
        model = Program
        fields = ['id', 'name', 'university', 'university_name', 'degree_type', 'duration']


class ProgramDetailSerializer(serializers.ModelSerializer):
    university = UniversitySerializer(read_only=True)
    subjects_required = SubjectSerializer(many=True, read_only=True)
    
    class Meta:
        model = Program
        fields = [
            'id', 'name', 'university', 'degree_type', 'description',
            'duration', 'entry_requirements', 'subjects_required'
        ]


class CareerPathListSerializer(serializers.ModelSerializer):
    class Meta:
        model = CareerPath
        fields = ['id', 'title', 'sector', 'average_salary']


class CareerPathDetailSerializer(serializers.ModelSerializer):
    related_programs = ProgramListSerializer(many=True, read_only=True)
    
    class Meta:
        model = CareerPath
        fields = [
            'id', 'title', 'description', 'skills_required', 'sector',
            'average_salary', 'job_outlook', 'related_programs'
        ]


class RecommendationSerializer(serializers.ModelSerializer):
    career_path_data = CareerPathListSerializer(source='career_path', read_only=True)
    
    class Meta:
        model = Recommendation
        fields = ['id', 'user', 'career_path', 'career_path_data', 'score', 'reasoning', 'created_at']
        read_only_fields = ['user', 'created_at']


class QuizOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizOption
        fields = ['id', 'text']


class QuizQuestionSerializer(serializers.ModelSerializer):
    options = QuizOptionSerializer(many=True, read_only=True)
    
    class Meta:
        model = QuizQuestion
        fields = ['id', 'text', 'order', 'options']


class CareerQuizListSerializer(serializers.ModelSerializer):
    class Meta:
        model = CareerQuiz
        fields = ['id', 'title', 'description', 'created_at']


class CareerQuizDetailSerializer(serializers.ModelSerializer):
    questions = QuizQuestionSerializer(many=True, read_only=True)
    
    class Meta:
        model = CareerQuiz
        fields = ['id', 'title', 'description', 'created_at', 'questions']


class QuizSubmissionSerializer(serializers.Serializer):
    answers = serializers.JSONField()


class QuizResultSerializer(serializers.ModelSerializer):
    quiz_title = serializers.CharField(source='quiz.title', read_only=True)
    
    class Meta:
        model = QuizResult
        fields = ['id', 'user', 'quiz', 'quiz_title', 'answers', 'score', 'completed_at']
        read_only_fields = ['user', 'completed_at']
